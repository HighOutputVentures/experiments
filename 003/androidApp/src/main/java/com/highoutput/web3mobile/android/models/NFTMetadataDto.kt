package com.highoutput.web3mobile.android.models

import com.google.gson.annotations.SerializedName
import com.highoutput.web3mobile.android.extensions.checkIpfs

data class NFTMetadataDto(
    @SerializedName("name")
    val name: String?,
    @SerializedName("description")
    val description: String?,
    @SerializedName("image_url", alternate = ["image"])
    val image: String,
) {
    fun toNFTMetadata(): NFTMetadata {
        return NFTMetadata(
            this.name ?: "",
            this.description ?: "",
            this.image.checkIpfs(),
        )
    }
}