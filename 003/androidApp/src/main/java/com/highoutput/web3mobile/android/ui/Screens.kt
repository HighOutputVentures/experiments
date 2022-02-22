package com.highoutput.web3mobile.android.ui

sealed class Screen(val route: String) {
    object AssetList : Screen("balance")
    object NftTransactions : Screen("nfts")
}