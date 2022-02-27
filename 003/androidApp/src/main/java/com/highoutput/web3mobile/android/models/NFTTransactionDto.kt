package com.highoutput.web3mobile.android.models

import com.google.gson.annotations.SerializedName

data class NFTTransactionDto(
    val cursor: String,
    val page: Int,
    @SerializedName("page_size")
    val pageSize: Int,
    val result: List<NFTResultDto>,
    val status: String,
    val total: Int
) {
    fun toNFTTransaction(): NFTTransaction {
        return NFTTransaction(
            this.cursor,
            this.page,
            this.pageSize,
            this.result.map { it -> it.toNFTResult() },
            this.status,
            this.total
        )
    }
}