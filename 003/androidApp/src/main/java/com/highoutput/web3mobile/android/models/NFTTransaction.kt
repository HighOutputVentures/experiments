package com.highoutput.web3mobile.android.models

import com.google.gson.annotations.SerializedName

data class NFTTransaction(
    val cursor: String? = "",
    val page: Int? = 0,
    val pageSize: Int? = 0,
    val result: List<NFTResult>,
    val status: String? = "",
    val total: Int? = 0
) {

}