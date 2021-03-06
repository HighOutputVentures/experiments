package com.highoutput.web3mobile.android

import android.util.Log
import com.highoutput.web3mobile.android.common.Resource
import com.highoutput.web3mobile.android.extensions.checkIpfs
import com.highoutput.web3mobile.android.models.NFTResult
import com.highoutput.web3mobile.android.models.NFTTransaction
import com.highoutput.web3mobile.android.network.MoralisApiService
import com.ralphordanza.samplekmm.android.BuildConfig
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.withContext
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import org.web3j.abi.FunctionEncoder
import org.web3j.abi.FunctionReturnDecoder
import org.web3j.abi.TypeReference
import org.web3j.abi.datatypes.Address
import org.web3j.abi.datatypes.Function
import org.web3j.abi.datatypes.Utf8String
import org.web3j.abi.datatypes.generated.Uint256
import org.web3j.protocol.Web3j
import org.web3j.protocol.core.DefaultBlockParameterName
import org.web3j.protocol.core.methods.response.EthBlock
import org.web3j.protocol.http.HttpService
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.math.BigDecimal
import java.math.BigInteger
import java.util.concurrent.TimeUnit


class MainRepository(private val moralisApiService: MoralisApiService, private val web3j: Web3j) {
    fun loadNFTImage(
        address: String,
        limit: Int,
        cursor: String,
    ): Flow<Resource<NFTTransaction>> =
        flow {
            emit(Resource.Loading<NFTTransaction>())
            try {
                val nfts = mutableListOf<NFTResult>()
                var transaction = NFTTransaction(result = listOf())

                val response = moralisApiService.getTransactionsViaAddress(
                    address,
                    "rinkeby",
                    limit,
                    cursor,
                )

                if (response.isSuccessful) {
                    transaction = response.body()!!.toNFTTransaction()
                    val results = response.body()!!.result
                    results.forEach { result ->
                        if (result.tokenUri != null && result.metadata != null && result.syncedAt != null) {
                            val res = result.toNFTResult()
                            if (res.tokenUri!!.contains("pre-reveal")) {
                                val token = tokenURI(res.tokenId, address, res.tokenAddress)
                                val meta = moralisApiService.getMetadata(
                                    token
                                )

                                if (meta.isSuccessful) {
                                    val metadata = meta.body()!!
                                    val nft = result.toNFTResult().copy(metadata = metadata)
                                    nfts.add(nft)
                                } else {
                                    Log.d("ERROR", "${response.code()}")
                                }
                            } else {
                                nfts.add(res)
                            }
                        } else if (result.tokenUri != null && result.metadata == null && result.syncedAt != null) {
                            val token = result.tokenUri.checkIpfs()
                            val meta = moralisApiService.getMetadata(
                                token
                            )

                            if (meta.isSuccessful) {
                                val metadata = meta.body()!!
                                val nft = result.toNFTResult().copy(metadata = metadata)
                                nfts.add(nft)
                            } else {
                                Log.d("ERROR", "${response.code()}")
                            }
                        }
                    }
                } else {
                    Log.d("ERROR", "${response.code()}")
                }
                val trans = transaction.copy(result = nfts)
                emit(Resource.Success<NFTTransaction>(trans))
            } catch (e: Exception) {
                Log.d("exception", e.message ?: "")
                emit(Resource.Error<NFTTransaction>(e.message ?: "Something went wrong"))
            }
        }

    private fun tokenURI(
        tokenId: String, address: String, contractAddress: String,
    ): String {
        val function = Function(
            "tokenURI",
            listOf(Uint256(BigInteger(tokenId))),
            listOf(object : TypeReference<Utf8String>() {}),
        )

        val encodedFunction = FunctionEncoder.encode(function)

        val response = web3j.ethCall(
            org.web3j.protocol.core.methods.request.Transaction.createEthCallTransaction(
                address,
                contractAddress,
                encodedFunction), DefaultBlockParameterName.LATEST)
            .sendAsync().get()

        val someTypes = FunctionReturnDecoder.decode(
            response.value, function.outputParameters)

        Log.d("TOKEN", "${someTypes}")

        if (someTypes.isNotEmpty()) {
            return someTypes[0].value.toString().checkIpfs()
        }
        return "";
    }

    fun sendNFT(
        to: String,
        from: String,
        contractAddress: String,
        tokenId: String,
    ): Flow<Resource<String>> = flow {
        try {
            emit(Resource.Loading())
            val function = Function(
                "safeTransferFrom",
                listOf(
                    Address(from),
                    Address(to),
                    Uint256(BigInteger(tokenId)),
                ),
                listOf(object : TypeReference<Utf8String>() {}),
            )

            val encodedFunction = FunctionEncoder.encode(function)
            Log.d("FUNCTION", encodedFunction)

            emit(Resource.Success(encodedFunction))
        } catch (e: Exception) {
            Log.d("exception", e.message ?: "")
        }
    }

    fun initializeWeb3(): String {
        return try {
            val clientVersion = web3j.web3ClientVersion()
                .sendAsync().get()
            if (!clientVersion.hasError()) {
                clientVersion.result
            } else {
                "Failed"
            }
        } catch (e: Exception) {
            e.message ?: "Something went wrong"
        }
    }

    fun shutdown(): Boolean {
        return try {
            web3j.shutdown()
            true
        } catch (e: Exception) {
            false
        }
    }

    fun getBalance(address: String): String {
        return try {
            val balance =
                web3j.ethGetBalance(address, DefaultBlockParameterName.LATEST).sendAsync()
                    .get(10, TimeUnit.SECONDS)
            val unscaledBalance = balance.balance.toString()
            val scaledBalance = BigDecimal(unscaledBalance).divide(BigDecimal(1000000000000000000L))
            scaledBalance.toString()
        } catch (e: Exception) {
            e.message ?: "Something went wrong"
        }
    }

    fun getTransactions(address: String): List<String> {
        val transactions =
            web3j.ethGetBlockByNumber(DefaultBlockParameterName.LATEST, true).sendAsync()
                .get(10, TimeUnit.SECONDS).block.transactions
        val from = mutableListOf<String>()
        transactions.map {
            val tx = it.get() as EthBlock.TransactionObject
            from.add(tx.from)
        }
        return from
    }


}