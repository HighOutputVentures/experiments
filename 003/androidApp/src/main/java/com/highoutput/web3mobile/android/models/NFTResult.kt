package com.highoutput.web3mobile.android.models

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

data class NFTResult(
    @SerializedName("blockHash")
    @Expose
    val blockHash: String,
    @SerializedName("blockNumber")
    @Expose
    val blockNumber: String,
    @SerializedName("confirmations")
    @Expose
    val confirmations: String,
    @SerializedName("contractAddress")
    @Expose
    val contractAddress: String,
    @SerializedName("cumulativeGasUsed")
    @Expose
    val cumulativeGasUsed: String,
    @SerializedName("from")
    @Expose
    val from: String,
    @SerializedName("gas")
    @Expose
    val gas: String,
    @SerializedName("gasPrice")
    @Expose
    val gasPrice: String,
    @SerializedName("gasUsed")
    @Expose
    val gasUsed: String,
    @SerializedName("hash")
    @Expose
    val hash: String,
    @SerializedName("input")
    @Expose
    val input: String,
    @SerializedName("nonce")
    @Expose
    val nonce: String,
    @SerializedName("timeStamp")
    @Expose
    val timeStamp: String,
    @SerializedName("to")
    @Expose
    val to: String,
    @SerializedName("tokenDecimal")
    @Expose
    val tokenDecimal: String,
    @SerializedName("tokenID")
    @Expose
    val tokenID: String,
    @SerializedName("tokenName")
    @Expose
    val tokenName: String,
    @SerializedName("tokenSymbol")
    @Expose
    val tokenSymbol: String,
    @SerializedName("transactionIndex")
    @Expose
    val transactionIndex: String
)