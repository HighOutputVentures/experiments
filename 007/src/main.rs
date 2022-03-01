pub mod lib;
use lib::Worker;

#[tokio::main]
async fn main() {
    let worker = Worker::new(
        String::from("mongodb://root:lostintheabyss@localhost:27017"),
        String::from("expirement007"),
        String::from("https://mainnet.infura.io/v3/58b6195ca6e942b9b3e4d539e352b9e6"),
    );
    worker.start().await;
}
