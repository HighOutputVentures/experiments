package com.highoutput.web3mobile.android.network

import com.highoutput.web3mobile.android.models.NFTImage
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Path
import retrofit2.http.Query

interface OpenSeaApiService {

    @GET("https://api.opensea.io/api/v1/asset/{contract_address}/{token_id}/")
    suspend fun loadNftImage(
        @Path("contract_address") contractAddress: String,
        @Path("token_id") tokenId: String,
    ): Response<NFTImage>
}