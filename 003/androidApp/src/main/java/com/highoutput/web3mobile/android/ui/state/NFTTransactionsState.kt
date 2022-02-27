package com.highoutput.web3mobile.android.ui.state

import com.highoutput.web3mobile.android.models.NFT
import com.highoutput.web3mobile.android.models.NFTResult

data class NFTTransactionsState(
    var transactions: List<NFTResult> = mutableListOf(),
    val isLoading: Boolean = false,
    val error: String = "",
)