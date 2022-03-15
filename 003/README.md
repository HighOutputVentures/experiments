## Authors

* Ralph Ordanza

## Goal Statements

* demonstrate direct interaction of a mobile app with the EVM
* integrate third-party wallets such as Metamask

## Abstract



## Conclusion

We can conclude that it is possible to connect directly to the blockchain with mobile alone with the
use of Web3J and WalletConnect side by side. WalletConnect proves that it is possible to integrate third-patry
wallets with the use of deep linking. However, there are still some limitation when it comes to
developing dApps for mobile (natively). First, documentations are still limited. Second, some of the
functions (`eth_signTransaction` which is one of the most important function) are not yet supported
on the third-party mobile wallets, although they already support `eth_sign`, `eth_sendTransaction`
etc. 

With `eth_sendTransaction` is the only available option as of the moment, we can utilize this in order to
confirm the transaction to the Metamask. The only downside in using this function is that, it
doesn't explicitly display what method is being used in the smart contract as compared to the Metamask
browser extension. This might be the reason why Metamask decided to build their mobile app using React Native as it has
a close relation to web technologies. As well as the reason why OpenSea does not support
purchasing NFTs with their native mobile apps yet. Instead, only redirect the user to their web app
to purchase an NFT.

It is possible to build your own `mobile wallet` apps with the use of Web3J but we can say that dapps
built for mobile, if not wallet app, only serves as displaying app or a showcase app.

## Resources

https://docs.walletconnect.com/quick-start/wallets/kotlin

https://github.com/WalletConnect/kotlin-walletconnect-lib

https://docs.web3j.io/4.8.7/

https://infura.io/dashboard

https://docs.moralis.io/moralis-server/web3-sdk/nft-api

https://docs.etherscan.io/v/rinkeby-etherscan/api-endpoints/accounts#get-a-list-of-erc721-token-transfer-events-by-address

https://ethereum.stackexchange.com/questions/13387/how-to-query-the-state-of-a-smart-contract-using-web3j-in-android/13397

https://docs.metamask.io/guide/registering-function-names.html

## Documentation

### 2 ways to fetch NFTs of a contract address

1. Using Etherscan and Web3J
2. Using Moralis API (easier way)

#### Using Etherscan API and Web3J

1. Fetch ERC721 transfer events
   from https://docs.etherscan.io/v/rinkeby-etherscan/api-endpoints/accounts#get-a-list-of-erc721-token-transfer-events-by-address
2. Get the contract addresses of each transactions
3. Loop through the contract addresses then filter out transactions using `ownerOf` query from smart contract 
4. Once you've filtered out the transactions, you may now query the smart contract using `tokenURI`
   to get the uri containing metadata
5. The metadata will contain the `name`, `description`, `image`, etc. of the NFT

> 🚧 Metadata information are inconsistent
>
> Make sure to set your fields to nullable to avoid null exceptions

#### Using Moralis API (easier way)

1. Fetch NFTs using `{address}/nft` endpoint
2. The metadata is already included in the token object as a json string. Parse it to the native
   platform object and you're good to go

> 🚧 Values for tokenURI and metadata might be null
>
> Make sure to set your fields to nullable to avoid null exceptions.
> If this happens, you may use web3j to query the `tokenURI`. From there, you may now get the missing metadata.

> 💡 IPFS format
>
> If the image or tokenURI is formatted as `ipfs://{id}`, convert it to `https://ipfs.io/ipfs/{id}` in
> order to access it directly on the web browser


#### Sending an NFT to another address

So, it turns out that sending an NFT and signing the transaction is possible using Metamask mobile. The only
problem is, Metamask does not show the function used to transfer the token explicitly, in this
case `safeTransferFrom`. Instead, it displays it as `unknown method`

1. Encode the function using web3j (we will use the `safeTransferFrom` method)
```
val function = Function(
   "safeTransferFrom",
   listOf(
     Address(from),
     Address(to),
     Uint256(BigInteger(tokenId)),
   ),
   listOf(object : TypeReference<Utf8String>() {}),
)
val encodedFunction = FunctionEncoder.encode(function)
```
2. Using WalletConnect, use the performMethodCall `SendTransaction` and apply the parameters. Making sure to supply
the function we encoded earlier to the `data` parameter.
```
val txRequest = System.currentTimeMillis()
val nonce = MainRepository.web3j.ethGetTransactionCount(
   viewModel.address.value, DefaultBlockParameterName.LATEST).sendAsync().get();
MainApplication.session?.performMethodCall(
   Session.MethodCall.SendTransaction(
       id = txRequest,
       from = viewModel.address.value,
       to = contractAddress,
       nonce = nonce.transactionCount.toString(16),
       gasPrice = DefaultGasProvider.GAS_PRICE.toString(16),
       gasLimit = DefaultGasProvider.GAS_LIMIT.toString(16),
       value = BigInteger.ZERO.toString(16),
       data = encodedFunction
   )
) { resp ->
   if (resp.id == txRequest) {
       Log.d("RESPONSE", resp.result.toString())
   }
}
val i = Intent(Intent.ACTION_VIEW)
i.data = Uri.parse("wc:")
context.startActivity(i)
```

#### Register Contract Method Name

1. There are 2 separate contracts for mainnet and rinkeby
   - Mainnet: https://etherscan.io/address/0x44691b39d1a75dc4e0a0346cbb15e310e6ed1e86#writeContract
   - Rinkeby: https://rinkeby.etherscan.io/address/0x0c0831fb1ec7442485fb41a033ba188389a990b4
2. Go to the contracts tab and choose `Write Contract`. There you will see the `register` method.
3. Add your desired method name following this format:
   - If no parameters
   ```
   getOwners()
   ```
   - If there are required parameters. **Make sure there are no spaces in between the commas of the parameters**
   ```
   execTransaction(address,uint256,bytes,uint8,uint256,uint256,uint256,address,address,bytes)
   ```
4. Click `write`
5. Metamask will open to approve your transaction. You will need to pay the gas fee.
6. Lastly, you can verify if the method name was successfuly registered by going to this website https://jenny.lol/function_signature_registry/. Paste in  the first 10 characters of your encoded contract ABI string eg. `0x42842e0e`. It should display the method name associated with that signature

