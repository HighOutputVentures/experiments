package com.highoutput.web3mobile.android

import android.app.Application
import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import dagger.hilt.android.HiltAndroidApp
import okhttp3.OkHttpClient
import org.komputing.khex.extensions.toNoPrefixHexString
import org.walletconnect.Session
import org.walletconnect.impls.FileWCSessionStore
import org.walletconnect.impls.MoshiPayloadAdapter
import org.walletconnect.impls.OkHttpTransport
import org.walletconnect.impls.WCSession
import org.walletconnect.nullOnThrow
import java.io.File
import java.util.*

@HiltAndroidApp
class MainApplication : Application() {

    override fun onCreate() {
        super.onCreate()
        initMoshi()
        initClient()
        initSessionStorage()
    }

    private fun initClient() {
        client = OkHttpClient.Builder().build()
    }

    private fun initMoshi() {
        moshi = Moshi.Builder()
            .add(KotlinJsonAdapterFactory())
            .build()
    }

    private fun initSessionStorage() {
        storage = FileWCSessionStore(File(cacheDir, "session_store.json").apply { createNewFile() }, moshi)
    }

    companion object {
        lateinit var client: OkHttpClient
        lateinit var moshi: Moshi
        lateinit var storage: FileWCSessionStore
        lateinit var config: Session.Config
        var session: Session? = null

        fun resetSession() {
            nullOnThrow { session }?.clearCallbacks()
            val key = ByteArray(32).also { Random().nextBytes(it) }.toNoPrefixHexString()
            config = Session.Config(UUID.randomUUID().toString(), "https://bridge.walletconnect.org", key)
            session = WCSession(config.toFullyQualifiedConfig(),
                MoshiPayloadAdapter(moshi),
                storage,
                OkHttpTransport.Builder(client, moshi),
                Session.PeerMeta(name = "Example App")
            )
            session?.offer()
        }
    }
}
