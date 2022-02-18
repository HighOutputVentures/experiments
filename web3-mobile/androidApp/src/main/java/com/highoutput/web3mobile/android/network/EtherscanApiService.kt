package com.highoutput.web3mobile.android.network

import com.highoutput.web3mobile.android.common.Resource
import com.highoutput.web3mobile.android.models.NFTTransaction
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Query

interface EtherscanApiService {

    @GET("https://api.etherscan.io/api")
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
}