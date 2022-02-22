package com.highoutput.web3mobile.android

import android.util.Log
import com.highoutput.web3mobile.android.common.Resource
import com.highoutput.web3mobile.android.extensions.ipfsToHttp
import com.highoutput.web3mobile.android.models.NFT
import com.highoutput.web3mobile.android.models.NFTResult
import com.highoutput.web3mobile.android.network.EtherscanApiService
import com.ralphordanza.samplekmm.android.BuildConfig
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import org.web3j.abi.FunctionEncoder
import org.web3j.abi.FunctionReturnDecoder
import org.web3j.abi.TypeReference
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
import java.util.concurrent.TimeUnit

class MainRepository {
    companion object{
        val interceptor = HttpLoggingInterceptor()

        init {
            this.interceptor.setLevel(HttpLoggingInterceptor.Level.BODY)
        }

        val httpClient = OkHttpClient.Builder().addInterceptor(interceptor).build();

        val retrofit = Retrofit.Builder()
            .baseUrl(BuildConfig.ETHERSCAN_RINKEBY_BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .client(httpClient)
            .build()

        val token = BuildConfig.ETHERSCAN_API_KEY

        val service: EtherscanApiService = retrofit.create(EtherscanApiService::class.java)

        val web3j =
            Web3j.build(HttpService("https://rinkeby.infura.io/v3/d875af89f451403fa0bbc650e642df3a"));
    }

    suspend fun loadNfts(address: String): List<NFTResult> {
        return withContext(Dispatchers.IO) {
            val response = service.getTransactionsViaAddress(
                "account",
                "tokennfttx",
                address = address,
                1,
                50,
                1,
                99999999,
                "asc",
                apiKey = token,
            )
            if (!response.isSuccessful) {
                Log.d("ERROR", response.errorBody().toString())
            }
            response.body()!!.result
        }
    }

    suspend fun loadNFTImage(address: String): Resource<List<NFT>> {
        return withContext(Dispatchers.IO) {
            val nfts = mutableListOf<NFT>()
            loadNfts(address).forEach {
                val function = Function(
                    "tokenURI",
                    listOf(Uint256(it.tokenID.toLong())),
                    listOf(object : TypeReference<Utf8String>() {})
                )

                val encodedFunction = FunctionEncoder.encode(function)

                val response = web3j.ethCall(
                    org.web3j.protocol.core.methods.request.Transaction.createEthCallTransaction(
                        address,
                        it.contractAddress,
                        encodedFunction), DefaultBlockParameterName.LATEST)
                    .sendAsync().get()

                val someTypes = FunctionReturnDecoder.decode(
                    response.value, function.outputParameters)

                val typeValue = someTypes[0].value.toString()

                val tokenUriLink = if (typeValue.contains("ipfs")) {
                    //CONVERT IPFS (ipfs://{id}) LINK TO HTTP (https://ipfs.io/ipfs/{id})
                    val id = typeValue.split("://").last()
                    id.ipfsToHttp()
                } else {
                    typeValue
                }

                val meta = service.getMetadata(
                    tokenUriLink
                )

                val imageUrl = if (meta.body()!!.imageUrl.contains("ipfs")) {
                    val id = meta.body()!!.imageUrl.split("://").last()
                    id.ipfsToHttp()
                } else {
                    meta.body()!!.imageUrl
                }

                Log.d("IMAGE URL", imageUrl)

                nfts.add(
                    NFT(
                        imageUrl,
                        it,
                    ),
                )
            }
            Resource.Success(nfts)
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