package com.highoutput.web3mobile.android

import android.content.Context
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.first

object Preferences {

    val Context.dataStore by preferencesDataStore("filename")
    val SESSION_ID = stringPreferencesKey("session_id")

    suspend fun save(context: Context, key: String, value: String) {
        val dataStoreKey = stringPreferencesKey(key)
        context.dataStore.edit { session ->
            session[dataStoreKey] = value
        }
    }

    suspend fun read(context: Context, key: String): String? {
        val dataStoreKey = stringPreferencesKey(key)
        val preferences = context.dataStore.data.first()
        return preferences[dataStoreKey]
    }
}