package com.highoutput.web3mobile.android

import android.util.Log
import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.highoutput.web3mobile.android.models.NFT
import com.highoutput.web3mobile.android.models.NFTImage
import com.highoutput.web3mobile.android.models.NFTResult
import kotlinx.coroutines.launch
import org.walletconnect.Session
import org.walletconnect.nullOnThrow

class MainViewModel : ViewModel(), Session.Callback {

    private val repository = MainRepository()

    private val _address = mutableStateOf("")
    val address: State<String> = _address

    private val _connectionStatus = mutableStateOf("")
    val connectionStatus: State<String> = _connectionStatus

    private val _balance = mutableStateOf("")
    val balance: State<String> = _balance

    private val _transactions = mutableStateOf(listOf<String>())
    val transactions: State<List<String>> = _transactions

    private val _nftTransactions = mutableStateOf(listOf<NFTResult>())
    val nftTransactions: State<List<NFTResult>> = _nftTransactions

    init {
        initialSetup()
        initWeb3()
    }

    fun loadNfts(address: String){
        viewModelScope.launch {
            val response = repository.loadNfts(address)
            response.data?.let {
                _nftTransactions.value = it.result
            }
        }
    }

    fun initWeb3() {
        val response = repository.initializeWeb3()
    }

    fun closeWeb3() {
        val response = repository.shutdown()
    }

    fun getBalance() {
        val response = repository.getBalance(address.value)
        _balance.value = response
    }

    fun getTransactions() {
        val response = repository.getTransactions(address.value)
        _transactions.value = listOf()
        _transactions.value = response
    }

    private fun initialSetup() {
        val session = nullOnThrow { MainApplication.session } ?: return
        session.addCallback(this)
    }

    override fun onMethodCall(call: Session.MethodCall) {
        Log.d("CALL", "${call.id()}")
    }

    override fun onStatus(status: Session.Status) {
        when (status) {
            Session.Status.Approved -> {
                sessionApproved()
            }
            Session.Status.Closed -> {
                sessionClear()
            }
            Session.Status.Connected,
            Session.Status.Disconnected,
            is Session.Status.Error,
            -> {
                // Do Stuff
            }
        }
    }

    private fun sessionApproved() {
        _connectionStatus.value = "SESSION APPROVED"
        _address.value = MainApplication.session?.approvedAccounts()?.first() ?: ""
        getBalance()
        getTransactions()
    }

    private fun sessionClear() {
        _connectionStatus.value = ""
        _address.value = ""
        _balance.value = ""
        _transactions.value = listOf()
    }

    fun resetSession() {
        MainApplication.resetSession()
        MainApplication.session?.addCallback(this)
    }

    fun closeConnection() {
        MainApplication.session?.kill()
        closeWeb3()
    }
}