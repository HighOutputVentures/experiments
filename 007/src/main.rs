use ethabi::ethereum_types::U256 as ethabi_U256;
use ethabi::{decode, param_type::ParamType, Token};
use mongodb::{
    bson::doc,
    options::{ClientOptions, UpdateOptions},
    Client, Database,
};
use serde::{Deserialize, Serialize};
use std::{env, error};
use web3::signing::keccak256;
use web3::types::{Address, BlockNumber, FilterBuilder, H160, H256, U256};

#[tokio::main]
async fn main() {
    match process().await {
        Ok(_) => println!("Done processing"),
        Err(error) => eprintln!("Something went wrong {}", error),
    }
}

enum TokenType {
    ERC20,
    ERC721,
    ERC1155,
}

#[derive(Debug, Serialize, Deserialize)]
struct ContractAddress {
    address: H160,
    token_type: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct TokenOwnership {
    contract_address: H160,
    token_id: i64,
    owner: H160,
    quantity: i64,
}

async fn process() -> Result<(), Box<dyn error::Error>> {
    dotenv::dotenv()?;

    let db = get_db().await?;

    let address_collection = db.collection::<ContractAddress>("addresses");
    let ownership_collection = db.collection::<TokenOwnership>("ownerships");

    let transport = web3::transports::Http::new(&env::var("INFURA_KEY")?)?;
    let web3 = web3::Web3::new(transport);

    let erc_20_and_721_transfer_signature =
        H256::from(keccak256("Transfer(address,address,uint256)".as_bytes()));
    let erc_1155_transfer_single_signature = H256::from(keccak256(
        "TransferSingle(address,address,address,uint256,uint256)".as_bytes(),
    ));
    let erc_1155_transfer_batch_signature = H256::from(keccak256(
        "TransferBatch(address,address,address,uint256[],uint256[])".as_bytes(),
    ));

    let signatures_filter = vec![
        erc_20_and_721_transfer_signature,
        erc_1155_transfer_single_signature,
        erc_1155_transfer_batch_signature,
    ];

    let filter = FilterBuilder::default()
        .from_block(BlockNumber::Latest)
        .topics(Some(signatures_filter), None, None, None)
        .build();

    let logs = web3.eth().logs(filter).await?;

    for log in logs {
        let token_type =
            if log.topics[0] == erc_20_and_721_transfer_signature && log.topics.len() == 3 {
                Some(TokenType::ERC20)
            } else if log.topics[0] == erc_20_and_721_transfer_signature && log.topics.len() == 4 {
                Some(TokenType::ERC721)
            } else if log.topics[0] == erc_1155_transfer_single_signature
                || log.topics[0] == erc_1155_transfer_batch_signature
            {
                Some(TokenType::ERC1155)
            } else {
                None
            };

        if let Some(token_type) = token_type {
            let token_type = match token_type {
                TokenType::ERC20 => "ERC20",
                TokenType::ERC721 => "ERC721",
                TokenType::ERC1155 => "ERC1155",
            };

            if matches!(log.log_index, Some(log_index) if log_index == U256::from(0) ) {
                match address_collection
                    .update_one(
                        doc! {
                            "address": format!("{:#x}", log.address),
                        },
                        doc! {
                            "$set": {
                                "token_type": token_type,
                            }
                        },
                        UpdateOptions::builder().upsert(true).build(),
                    )
                    .await
                {
                    Ok(_) => {}
                    Err(error) => {
                        eprintln!("{}", error)
                    }
                };
            }

            if token_type == "ERC20" {
                if Address::from(log.topics[1]) != Address::default() {
                    let decoded_quantity = match decode(&vec![ParamType::Uint(256)], &log.data.0) {
                        Ok(decoded) => match decoded[0] {
                            Token::Uint(quantity) => quantity,
                            _ => ethabi_U256::default(),
                        },
                        Err(_) => ethabi_U256::default(),
                    };

                    let quantity = i64::from(
                        (decoded_quantity / ethabi_U256::from(10).pow(ethabi_U256::from(18)))
                            .low_u32(),
                    );

                    if quantity > 0 {
                        match ownership_collection
                            .update_one(
                                doc! {
                                    "contract_address": format!("{:#x}", log.address),
                                    "owner": format!("{:#x}", Address::from(log.topics[1])),
                                },
                                doc! {
                                        "$inc": {
                                            "quantity": -quantity
                                        }
                                },
                                UpdateOptions::builder().upsert(true).build(),
                            )
                            .await
                        {
                            Ok(_) => {}
                            Err(error) => {
                                eprintln!("{}", error)
                            }
                        };

                        match ownership_collection
                            .update_one(
                                doc! {
                                    "contract_address": format!("{:#x}", log.address),
                                    "owner": format!("{:#x}", Address::from(log.topics[2])),
                                },
                                doc! {
                                        "$inc": {
                                            "quantity": quantity
                                        }
                                },
                                UpdateOptions::builder().upsert(true).build(),
                            )
                            .await
                        {
                            Ok(_) => {}
                            Err(error) => {
                                eprintln!("{}", error)
                            }
                        };
                    }
                }
            } else if token_type == "ERC721" {
                let decoded_token_id =
                    match decode(&vec![ParamType::Uint(256)], &log.topics[3].as_bytes()) {
                        Ok(decoded) => match decoded[0] {
                            Token::Uint(token_id) => token_id,
                            _ => ethabi_U256::default(),
                        },
                        Err(_) => ethabi_U256::default(),
                    };

                let token_id = i64::from(decoded_token_id.low_u32());

                if Address::from(log.topics[1]) != Address::default()
                    && Address::from(log.topics[2]) != Address::default()
                    && token_id > 0
                {
                    match ownership_collection
                        .delete_one(
                            doc! {
                                "contract_address": format!("{:#x}", log.address),
                                "owner": format!("{:#x}", Address::from(log.topics[1])),
                                "token_id": token_id,
                            },
                            None,
                        )
                        .await
                    {
                        Ok(_) => {}
                        Err(error) => {
                            eprintln!("{}", error)
                        }
                    };

                    match ownership_collection
                        .insert_one(
                            TokenOwnership {
                                contract_address: log.address,
                                token_id,
                                owner: Address::from(log.topics[2]),
                                quantity: 1,
                            },
                            None,
                        )
                        .await
                    {
                        Ok(_) => {}
                        Err(error) => {
                            eprintln!("{}", error)
                        }
                    };
                } else if Address::from(log.topics[2]) == Address::default() && token_id > 0 {
                    match ownership_collection
                        .delete_many(
                            doc! {
                                "contract_address": format!("{:#x}", log.address),
                                "token_id": token_id,
                            },
                            None,
                        )
                        .await
                    {
                        Ok(_) => {}
                        Err(error) => {
                            eprintln!("{}", error)
                        }
                    };
                }
            }
        }
    }

    Ok(())
}

async fn get_db() -> Result<Database, Box<dyn error::Error>> {
    let client_options =
        ClientOptions::parse("mongodb://root:lostintheabyss@localhost:27017").await?;

    let client = Client::with_options(client_options)?;

    let db = client.database("ethereal");

    Ok(db)
}
