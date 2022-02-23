package com.highoutput.web3mobile.android.models

import com.google.gson.annotations.SerializedName

data class NFTResult(
    val amount: String,
    val blockNumber: String,
    val blockNumberMinted: String,
    val contract_type: String,
    val frozen: Int,
    val isValid: Int,
    val metadata: NFTMetadata?,
    val name: String,
    val ownerOf: String,
    val symbol: String,
    val syncedAt: String?,
    val syncing: Int,
    val tokenAddress: String,
    val tokenId: String,
    val tokenUri: String?,
)