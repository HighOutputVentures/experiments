## Authors

* Ralph Ordanza

## Goal Statements

* demonstrate direct interaction of a mobile app with the EVM
* integrate third-party wallets such as Metamask

## Abstract

## Conclusion

We can prove that it is possible to connect directly to the blockchain with mobile alone with the
use of Web3J. On the other hand, WalletConnect proves that it is possible to integrate third-patry
wallets with the use of deep linking. However, there are still some limitation when it comes to
developing dApps for mobile. First, documentations are still limited. Second, some of the
functions (`eth_signTransaction` which is one of the most important function) are not yet supported
on the third-party mobile wallets, although they already support `eth_sign`, `eth_sendTransaction` etc.
which is a really good thing for ERC20 tokens. This might be the reason why Metamask decided
to build their mobile app using React Native as it has a close relation to web technologies. This
also might be the reason why OpenSea does not support purchasing NFTs with their native mobile apps
yet. Instead, only redirect the user to their web app to purchase an NFT.

We can say that dapps built for mobile, if not wallet app, only serves as displaying app or a
showcase app.

## Resources

https://docs.walletconnect.com/quick-start/wallets/kotlin

https://github.com/WalletConnect/kotlin-walletconnect-lib

https://docs.web3j.io/4.8.7/

https://infura.io/dashboard

https://docs.moralis.io/moralis-server/web3-sdk/nft-api

https://docs.etherscan.io/v/rinkeby-etherscan/api-endpoints/accounts#get-a-list-of-erc721-token-transfer-events-by-address

https://ethereum.stackexchange.com/questions/13387/how-to-query-the-state-of-a-smart-contract-using-web3j-in-android/13397

## Documentation

### 2 ways to fetch NFTs of a contract address

1. Using Etherscan and Web3J
2. Using Moralis API (easier way)

##### Using Etherscan API and Web3J

1. Fetch ERC721 transfer events
   from https://docs.etherscan.io/v/rinkeby-etherscan/api-endpoints/accounts#get-a-list-of-erc721-token-transfer-events-by-address
2. Get the contract addresses of each transactions
3. Loop through the contract addresses then query the smart contract using `ownerOf` to filter out
   the transactions of a specific contract address
4. Once you've filtered out the transactions, you may now query the smart contract using `tokenURI`
   to get the uri containing metadata
5. The metadata will contain the `name`, `description`, `image`, etc. of the NFT

> 🚧 Metadata information are inconsistent
>
> Make sure to set your fields to nullable to avoid null exceptions

##### Using Moralis API (easier way)

1. Fetch NFTs using `{address}/nft` endpoint
2. The metadata is already included in the token object as a json string. Parse it to the native
   platform object and you're good to go

> 🚧 Values for tokenURI and metadata might be null
>
> Make sure to set your fields to nullable to avoid null exceptions.
> If this happens, you may use web3j to query the `tokenURI`. From there, you may now get the missing metadata.

If the image or tokenURI is formatted as `ipfs://id`. Convert it to `https://ipfs.io/ipfs/{id}` in
order to access it directly on the web browser

##### Challenges

* Concluding that `eth_signTransaction` is not supported yet by metamask-mobile (this might change in
  the future, will just update accordingly)
    - https://github.com/MetaMask/metamask-mobile/issues/2834
    - https://github.com/MetaMask/metamask-mobile/issues/3437
* This prevents us from transferring an NFT on mobile as this can be set as a limitation on the
  metamask mobile app as of now
* This can be the reason why OpenSea does not support buying of NFT on their native mobile apps yet.
  They only redirect the user to their web app to purchase an NFT