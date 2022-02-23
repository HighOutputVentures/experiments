package com.highoutput.web3mobile.android.models

import com.google.gson.Gson
import com.google.gson.annotations.SerializedName

data class NFTResultDto(
    val amount: String,
    @SerializedName("block_number")
    val blockNumber: String,
    @SerializedName("block_number_minted")
    val blockNumberMinted: String,
    @SerializedName("contract_type")
    val contract_type: String,
    val frozen: Int,
    @SerializedName("is_valid")
    val isValid: Int,
    val metadata: String?,
    val name: String,
    @SerializedName("owner_of")
    val ownerOf: String,
    val symbol: String,
    @SerializedName("synced_at")
    val syncedAt: String?,
    val syncing: Int,
    @SerializedName("token_address")
    val tokenAddress: String,
    @SerializedName("token_id")
    val tokenId: String,
    @SerializedName("token_uri")
    val tokenUri: String?,
) {
    fun toNFTResult(): NFTResult {

        val meta: NFTMetadataDto? = Gson().fromJson(metadata, NFTMetadataDto::class.java)

        return NFTResult(
            this.amount,
            this.blockNumber,
            this.blockNumberMinted,
            this.contract_type,
            this.frozen,
            this.isValid,
            meta?.toNFTMetadata(),
            this.name,
            this.ownerOf,
            this.symbol,
            this.syncedAt,
            this.syncing,
            this.tokenAddress,
            this.tokenId,
            this.tokenUri,
        )
    }
}