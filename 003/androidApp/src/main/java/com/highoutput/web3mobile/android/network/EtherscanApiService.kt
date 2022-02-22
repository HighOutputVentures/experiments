package com.highoutput.web3mobile.android.network

import com.highoutput.web3mobile.android.models.NFTMetadata
import com.highoutput.web3mobile.android.models.NFTTransaction
import com.ralphordanza.samplekmm.android.BuildConfig
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Path
import retrofit2.http.Query
import retrofit2.http.Url

interface EtherscanApiService {

    @GET("${BuildConfig.ETHERSCAN_RINKEBY_BASE_URL}/api")
    suspend fun getTransactionsViaAddress(
        @Query("module") module: String,
        @Query("action") action: String,
        @Query("address") address: String,
        @Query("page") page: Int,
        @Query("offset") offset: Int,
        @Query("startBlock") startBlock: Int,
        @Query("endBlock") endBlock: Int,
        @Query("sort") sort: String,
        @Query("apiKey") apiKey: String,
    ): Response<NFTTransaction>

    @GET
    suspend fun getMetadata(@Url url: String): Response<NFTMetadata>
}