package com.highoutput.web3mobile.android.models

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

data class NFTTransaction(
    @SerializedName("message")
    @Expose
    val message: String,
    @SerializedName("result")
    @Expose
    val result: List<NFTResult>,
    @SerializedName("status")
    @Expose
    val status: String
)