package com.highoutput.web3mobile.android.network

import com.highoutput.web3mobile.android.models.NFTMetadata
import com.highoutput.web3mobile.android.models.NFTTransaction
import com.highoutput.web3mobile.android.models.NFTTransactionDto
import com.ralphordanza.samplekmm.android.BuildConfig
import retrofit2.Response
import retrofit2.http.*

interface EtherscanApiService {

    @Headers("x-api-key: ${BuildConfig.MORALIS_API_KEY}")
    @GET("{address}/nft")
    suspend fun getTransactionsViaAddress(
        @Path("address") address: String,
        @Query("chain") chain: String,
        @Query("offset") offset: Int,
        @Query("limit") limit: Int,
    ): Response<NFTTransactionDto>

    @GET
    suspend fun getMetadata(@Url url: String): Response<NFTMetadata>
}