package com.highoutput.web3mobile.android.models

import com.google.gson.annotations.SerializedName

data class NFTMetadata(
    val name: String,
    @SerializedName(value="image_url", alternate= ["image"])
    val imageUrl: String
)