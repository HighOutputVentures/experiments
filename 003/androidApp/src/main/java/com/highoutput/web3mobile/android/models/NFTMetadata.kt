package com.highoutput.web3mobile.android.models

import com.google.gson.annotations.SerializedName

data class NFTMetadata(
    val name: String,
    @SerializedName("image_url")
    val imageUrl: String
)