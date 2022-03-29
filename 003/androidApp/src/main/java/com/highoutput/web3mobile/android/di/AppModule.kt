package com.highoutput.web3mobile.android.di

import android.content.Context
import com.highoutput.web3mobile.android.MainRepository
import com.highoutput.web3mobile.android.network.MoralisApiService
import com.ralphordanza.samplekmm.android.BuildConfig
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import org.web3j.protocol.Web3j
import org.web3j.protocol.http.HttpService
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Provides
    @Singleton
    fun provideHttpLoggingInterceptor(): HttpLoggingInterceptor {
        val logging = HttpLoggingInterceptor()
        logging.setLevel(HttpLoggingInterceptor.Level.BODY)
        return logging
    }

    @Provides
    @Singleton
    fun provideOkHttpClient(
        httpLoggingInterceptor: HttpLoggingInterceptor,
    ): OkHttpClient {
        return OkHttpClient.Builder()
            .addInterceptor(httpLoggingInterceptor)
            .build()
    }

    @Provides
    @Singleton
    fun provideRetrofitClient(
        okHttpClient: OkHttpClient,
    ): MoralisApiService {
        return Retrofit.Builder()
            .baseUrl(BuildConfig.MORALIS_BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .client(okHttpClient)
            .build()
            .create(MoralisApiService::class.java)
    }

    @Provides
    @Singleton
    fun provideWeb3j(): Web3j {
        val chain = "rinkeby"
        val web3jUrl = if (chain == "eth") {
            BuildConfig.INFURA_BASE_URL
        } else {
            BuildConfig.INFURA_RINKEBY_BASE_URL
        }
        return Web3j.build(HttpService(web3jUrl))
    }

    @Provides
    @Singleton
    fun provideMainRepository(moralisApiService: MoralisApiService, web3j: Web3j): MainRepository {
        return MainRepository(moralisApiService, web3j)
    }
}