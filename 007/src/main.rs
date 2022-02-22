use std::{env, error};
use web3::contract::{Contract, Options};
use web3::types::{Address, BlockNumber, FilterBuilder, H256};

use web3::signing::keccak256;

#[tokio::main]
async fn main() {
    match process().await {
        Ok(_) => println!("Done processing"),
        Err(error) => eprintln!("Something went wrong {}", error),
    }
}

async fn process() -> Result<(), Box<dyn error::Error>> {
    dotenv::dotenv()?;

    let transport = web3::transports::Http::new(&env::var("INFURA_KEY")?)?;
    let web3 = web3::Web3::new(transport);

    let topic_filter = keccak256("Transfer(address,address,uint256)".as_bytes());

    let filter = FilterBuilder::default()
        .from_block(BlockNumber::Latest)
        .topics(Some(vec![H256::from(topic_filter)]), None, None, None)
        .build();

    let logs = web3.eth().logs(filter).await?;

    for log in logs {
        if log.topics.len() == 3 {
            let smart_contract = match Contract::from_json(
                web3.eth(),
                log.address,
                include_bytes!("erc20_abi.json"),
            ) {
                Ok(contract) => contract,
                _ => {
                    continue;
                }
            };

            let token_name: String = match smart_contract
                .query("name", (), None, Options::default(), None)
                .await
            {
                Ok(result) => result,
                _ => {
                    continue;
                }
            };

            println!("ERC20");
            println!("{}", token_name);
            println!("Contract Address: {:?}", log.address);
            println!("From: {:?}", Address::from(log.topics[1]));
            println!("To: {:?}", Address::from(log.topics[2]));
            println!("--------");
        } else if log.topics.len() == 4 {
            let smart_contract = match Contract::from_json(
                web3.eth(),
                log.address,
                include_bytes!("erc721_abi.json"),
            ) {
                Ok(contract) => contract,
                _ => {
                    continue;
                }
            };

            let token_name: String = match smart_contract
                .query("name", (), None, Options::default(), None)
                .await
            {
                Ok(result) => result,
                _ => {
                    continue;
                }
            };

            println!("ERC721");
            println!("{}", token_name);
            println!("Contract Address: {:?}", log.address);
            println!("From: {:?}", Address::from(log.topics[1]));
            println!("To: {:?}", Address::from(log.topics[2]));
            println!("Token ID: {:?}", log.topics[3]);
            println!("--------")
        }
    }

    Ok(())
}
