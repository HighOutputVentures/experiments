package com.highoutput.web3mobile.android.ui

sealed class Screen(val route: String) {
    object AssetList : Screen("balance")
    object NftTransactions : Screen("nfts")
    object SendNFT: Screen("send_nft")

    fun withArgs(vararg args: String): String {
        return buildString {
            append(route)
            args.forEach { arg ->
                append("/$arg")
            }
        }
    }
}