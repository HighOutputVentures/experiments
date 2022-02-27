use ethabi::{decode, param_type::ParamType, Token};
use mongodb::{
    bson::doc,
    options::{ClientOptions, UpdateOptions},
    Client, Database,
};
use num_traits::cast::ToPrimitive;
use serde::{Deserialize, Serialize};
use std::{error, panic, time::Duration, sync::{Arc, Mutex}};
use tokio::{task, time::sleep, try_join};
use web3::{signing::keccak256, transports::Http, types::{Address, BlockNumber, FilterBuilder, Log, H160, H256, U256, U64}};

use web3::Web3;

#[derive(Debug, Serialize, Deserialize)]
struct ContractAddress {
    address: H160,
    token_type: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct TokenOwnership {
    contract_address: H160,
    token_id: String,
    owner: H160,
    quantity: f64,
}

#[derive(Debug)]
pub struct Worker {
    latest_block: Arc<Mutex<Option<U64>>>,
    database_host: String,
    database_name: String,
    ethereum_json_rpc_api_endpoint: String,
}

impl Worker {
    pub fn new(
        database_host: String,
        database_name: String,
        ethereum_json_rpc_api_endpoint: String,
    ) -> Self {
        let latest_block = Arc::new(Mutex::new(None));
        Self {
            latest_block,
            database_host,
            database_name,
            ethereum_json_rpc_api_endpoint,
        }
    }

    pub async fn start(self) {
        let logs_worker_latest_block = self.latest_block.clone();
        let ethereum_json_rpc_api_endpoint = self.ethereum_json_rpc_api_endpoint.clone();

        let latest_block_worker = task::spawn(async move {
            let web3 = get_web3_http(&self.ethereum_json_rpc_api_endpoint)
                .await
                .unwrap();

            loop {
                *self.latest_block.lock().unwrap() = match web3.eth().block_number().await {
                    Ok(value) => Some(value),
                    Err(_) => {
                        eprintln!("Error: Could not get the current block number, retrying...");
                        continue;
                    }
                };
                sleep(Duration::from_millis(60000)).await;
            }
        });

        let logs_worker = task::spawn(async move {
            //should query the database to get current block
            let mut current_block = U64::from(14282071);

            let db = get_database(&self.database_host, &self.database_name)
                .await
                .unwrap();

            let contract_address_collection =
                db.collection::<ContractAddress>("contract_addresses");
            let token_ownership_collection = db.collection::<TokenOwnership>("token_ownerships");

            let web3 = get_web3_http(&ethereum_json_rpc_api_endpoint)
                .await
                .unwrap();

            let erc_20_and_721_transfer_signature =
                H256::from(keccak256("Transfer(address,address,uint256)".as_bytes()));
            let erc_1155_transfer_single_signature = H256::from(keccak256(
                "TransferSingle(address,address,address,uint256,uint256)".as_bytes(),
            ));
            let erc_1155_transfer_batch_signature = H256::from(keccak256(
                "TransferBatch(address,address,address,uint256[],uint256[])".as_bytes(),
            ));

            loop {
                let latest_block = *logs_worker_latest_block.lock().unwrap();

                if let Some(latest_block) = latest_block {
                    if current_block <= latest_block {
                        println!(
                            "Processing block {} of {} blocks",
                            current_block, latest_block
                        );

                        let signatures_filter = vec![
                            erc_20_and_721_transfer_signature,
                            erc_1155_transfer_single_signature,
                            erc_1155_transfer_batch_signature,
                        ];

                        let filter = FilterBuilder::default()
                            .from_block(BlockNumber::Number(current_block))
                            .to_block(BlockNumber::Number(current_block))
                            .topics(Some(signatures_filter), None, None, None)
                            .build();

                        let logs: Vec<Log> = match web3.eth().logs(filter).await {
                            Ok(logs) => logs,
                            Err(error) => {
                                eprintln!("Error: Could not get the logs, retrying... {}", error);
                                continue;
                            }
                        };

                        for log in logs {
                            // criteria
                            let token_type = if log.topics[0] == erc_20_and_721_transfer_signature
                                && log.topics.len() == 3
                            {
                                Some("ERC20")
                            } else if log.topics[0] == erc_20_and_721_transfer_signature
                                && log.topics.len() == 4
                            {
                                Some("ERC721")
                            } else if log.topics[0] == erc_1155_transfer_single_signature
                                || log.topics[0] == erc_1155_transfer_batch_signature
                            {
                                Some("ERC1155")
                            } else {
                                None
                            };

                            // build contract_address model
                            if let Some(token_type) = token_type {
                                if matches!(log.log_index, Some(log_index) if log_index == U256::from(0) )
                                {
                                    match contract_address_collection
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
                                    // skip new token creation
                                    if Address::from(log.topics[1]) != Address::default() {
                                        let decoded_quantity = match decode(
                                            &vec![ParamType::Uint(256)],
                                            &log.data.0,
                                        ) {
                                            Ok(decoded) => match decoded[0] {
                                                Token::Uint(decoded_quantity) => decoded_quantity,
                                                _ => panic!(),
                                            },
                                            Err(_) => panic!(),
                                        };

                                        let quantity = decoded_quantity.as_u128().to_f64().unwrap();

                                        if let Some(transaction) = log.transaction_hash {
                                            println!("{:#x}", transaction);
                                        }

                                        if quantity > 0.0 {
                                            match token_ownership_collection.update_one(
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
                                            ).await {
                                                Ok(_) => {},
                                                Err(error) => {
                                                    eprintln!("{}", error)
                                                }
                                            };

                                            match token_ownership_collection.update_one(
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
                                            ).await {
                                                Ok(_) => {},
                                                Err(error) => {
                                                    eprintln!("{}", error)
                                                }
                                            };
                                        }
                                    }
                                } else if token_type == "ERC721" {
                                    if let Some(transaction_hash) = log.transaction_hash {
                                        println!("{:#x}", transaction_hash)
                                    }

                                    let decoded_token_id: String = match decode(
                                        &vec![ParamType::Uint(256)],
                                        &log.topics[3].as_bytes(),
                                    ) {
                                        Ok(decoded) => match decoded[0] {
                                            Token::Uint(token_id) => token_id.to_string(),
                                            _ => panic!(),
                                        },
                                        Err(_) => panic!(),
                                    };

                                    println!("{}", decoded_token_id);
                                    let token_id = decoded_token_id.to_string();
                                    println!("{}", token_id);

                                    // token transferred
                                    if Address::from(log.topics[1]) != Address::default()
                                        && Address::from(log.topics[2]) != Address::default()
                                    {
                                        match token_ownership_collection.delete_many(doc! {
                                            "contract_address": format!("{:#x}", log.address),
                                            "owner": format!("{:#x}", Address::from(log.topics[1])),
                                            "token_id": &token_id
                                        }, None).await {
                                            Ok(_) => {},
                                            Err(error) => {
                                                eprintln!("{}", error)
                                            }
                                        };

                                        match token_ownership_collection
                                            .insert_one(
                                                TokenOwnership {
                                                    contract_address: log.address,
                                                    token_id,
                                                    owner: Address::from(log.topics[2]),
                                                    quantity: 1.0,
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

                                    // token destroyed
                                    } else if Address::from(log.topics[2]) == Address::default() {
                                        match token_ownership_collection
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
                                } else if token_type == "ERC1155" {
                                }
                            }
                        }

                        current_block += U64::from(1);
                    } else {
                        println!("Waiting for new blocks");
                        sleep(Duration::from_millis(5000)).await;
                        continue;
                    }
                } else {
                    println!("Waiting for latest block");
                    sleep(Duration::from_millis(5000)).await;
                    continue;
                }
            }
        });

        match try_join!(latest_block_worker, logs_worker) {
            Ok(_) => {}
            Err(_) => eprintln!("Fatal Error: Worker stopped unexpectedly"),
        }
    }
}

async fn get_database(host: &String, database: &String) -> Result<Database, Box<dyn error::Error>> {
    let client_options = ClientOptions::parse(host).await?;

    let client = Client::with_options(client_options)?;

    let db = client.database(&database);

    Ok(db)
}

async fn get_web3_http(http_endpoint: &String) -> Result<Web3<Http>, Box<dyn error::Error>> {
    let transport = Http::new(&http_endpoint)?;
    let web3 = Web3::new(transport);
    Ok(web3)
}
