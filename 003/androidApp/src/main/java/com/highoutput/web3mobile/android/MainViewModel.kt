package com.highoutput.web3mobile.android

import android.util.Log
import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.highoutput.web3mobile.android.common.Resource
import com.highoutput.web3mobile.android.models.NFTResult
import com.highoutput.web3mobile.android.ui.state.NFTTransactionsState
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach
import org.walletconnect.Session
import org.walletconnect.nullOnThrow
import javax.inject.Inject

const val PAGE_SIZE = 10

@HiltViewModel
class MainViewModel @Inject constructor(private val repository: MainRepository) : ViewModel(),
    Session.Callback {

    private val _address = mutableStateOf("")
    val address: State<String> = _address

    private val _connectionStatus = mutableStateOf("")
    val connectionStatus: State<String> = _connectionStatus

    private val _balance = mutableStateOf("")
    val balance: State<String> = _balance

    private val _state = MutableStateFlow(NFTTransactionsState())
    val state = _state

    private val _endReached = mutableStateOf(false)
    val endReached: State<Boolean> = _endReached

    private var nftTransactions = mutableStateOf<List<NFTResult>>(mutableListOf())
    private var currPage = 1
    var cursor = ""

    init {
        initialSetup()
        initWeb3()
    }

    fun loadNFTImages(address: String) {
        repository.loadNFTImage(address, PAGE_SIZE, cursor).onEach { response ->
            when (response) {
                is Resource.Success -> {
                    response.data?.let {
                        nftTransactions.value += it.result
                        _endReached.value = currPage * PAGE_SIZE >= it.total!!
                        cursor = it.cursor ?: ""
                        currPage++

                        val state = _state.value.copy(
                            transactions = nftTransactions.value,
                            isLoading = false,
                        )
                        _state.value = state
                    }
                }
                is Resource.Loading -> {
                    val state = _state.value.copy(
                        isLoading = true,
                        error = "",
                    )
                    _state.value = state
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
        sessionApproved()
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
        loadNFTImages(_address.value)
    }

    private fun sessionClear() {
        _connectionStatus.value = ""
        _address.value = ""
        _balance.value = ""
        cursor = ""
        val state = _state.value.copy(
            transactions = mutableListOf(),
        )
        _state.value = state
    }

    fun resetSession() {
        MainApplication.resetSession()
        MainApplication.session?.addCallback(this)
    }

    fun closeConnection() {
        MainApplication.session?.kill()
        MainApplication.session?.removeCallback(this)
        sessionClear()
    }
}