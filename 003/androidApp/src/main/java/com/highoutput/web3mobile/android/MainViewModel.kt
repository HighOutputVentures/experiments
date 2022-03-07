package com.highoutput.web3mobile.android

import android.content.Intent
import android.net.Uri
import android.util.Log
import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.compose.viewModel
import com.highoutput.web3mobile.android.common.Resource
import com.highoutput.web3mobile.android.models.NFT
import com.highoutput.web3mobile.android.models.NFTResult
import com.highoutput.web3mobile.android.ui.state.NFTTransactionsState
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.launch
import org.walletconnect.Session
import org.walletconnect.nullOnThrow

const val PAGE_SIZE = 10

class MainViewModel : ViewModel(), Session.Callback {

    private val repository = MainRepository()

    private val _address = mutableStateOf("")
    val address: State<String> = _address

    private val _connectionStatus = mutableStateOf("")
    val connectionStatus: State<String> = _connectionStatus

    private val _balance = mutableStateOf("")
    val balance: State<String> = _balance

    private val _state = mutableStateOf(NFTTransactionsState())
    val state: State<NFTTransactionsState> = _state

    private val _endReached = mutableStateOf(false)
    val endReached: State<Boolean> = _endReached

    private val _isLoading = mutableStateOf(false)
    val isLoading: State<Boolean> = _isLoading

    private var nftTransactions = mutableStateOf<List<NFTResult>>(listOf())
    private var currPage = 1
    private var cursor = ""

    init {
        initialSetup()
        initWeb3()
    }

    fun loadNFTImages(address: String) {
        _isLoading.value = true
        repository.loadNFTImage(address, PAGE_SIZE, cursor).onEach { response ->
            when (response) {
                is Resource.Success -> {
                    response.data?.let {
                        _isLoading.value = false
                        nftTransactions.value += it.result
                        val state = _state.value.copy(
                            transactions = nftTransactions.value,
                            isLoading = false,
                        )
                        _state.value = state
                        _endReached.value = currPage * PAGE_SIZE >= it.total!!
                        cursor = it.cursor ?: ""
                        currPage++
                    }
                }
                is Resource.Error -> {
                    val state = _state.value.copy(
                        isLoading = false,
                        error = response.message ?: "",
                    )
                    _state.value = state
                }
            }
        }.launchIn(viewModelScope)
    }

    fun sendNFT(to: String, tokenId: String, contractAddress: String, callback: (String) -> Unit) {
        repository.sendNFT(
            to = to,
            from = _address.value,
            contractAddress = contractAddress,
            tokenId = tokenId,
        ).onEach { response ->
            when (response) {
                is Resource.Success -> {
                    response.data?.let {
                        callback(it)
                    }
                }
                is Resource.Error -> {
                    val state = _state.value.copy(
                        isLoading = false,
                        error = response.message ?: "",
                    )
                    _state.value = state
                }
            }
        }.launchIn(viewModelScope)
    }

    fun initWeb3() {
        repository.initializeWeb3()
    }

    fun closeWeb3() {
        repository.shutdown()
    }

    fun getBalance() {
        val response = repository.getBalance(address.value)
        _balance.value = response
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
    }

    private fun sessionClear() {
        _connectionStatus.value = ""
        _address.value = ""
        _balance.value = ""
        _state.value = NFTTransactionsState()
    }

    fun resetSession() {
        MainApplication.session?.kill()
        MainApplication.resetSession()
        MainApplication.session?.addCallback(this)
    }

    fun closeConnection() {
        MainApplication.session?.kill()
        closeWeb3()
        sessionClear()
    }
}