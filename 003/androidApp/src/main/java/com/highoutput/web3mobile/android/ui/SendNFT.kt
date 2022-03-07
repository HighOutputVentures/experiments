package com.highoutput.web3mobile.android.ui

import android.content.Intent
import android.net.Uri
import android.util.Log
import androidx.compose.foundation.layout.Column
import androidx.compose.material.Button
import androidx.compose.material.OutlinedTextField
import androidx.compose.material.Text
import androidx.compose.runtime.*
import androidx.compose.ui.platform.LocalContext
import androidx.navigation.NavController
import com.highoutput.web3mobile.android.MainApplication
import com.highoutput.web3mobile.android.MainRepository
import com.highoutput.web3mobile.android.MainViewModel
import com.ralphordanza.samplekmm.android.BuildConfig
import org.walletconnect.Session
import org.web3j.crypto.Hash
import org.web3j.protocol.Web3j
import org.web3j.protocol.core.DefaultBlockParameterName
import org.web3j.protocol.core.methods.response.EthSendTransaction
import org.web3j.protocol.http.HttpService
import org.web3j.rlp.RlpEncoder
import org.web3j.rlp.RlpType
import org.web3j.tx.gas.DefaultGasProvider
import java.math.BigInteger


@Composable
fun SendNFT(
    navController: NavController,
    viewModel: MainViewModel,
    tokenId: String,
    contractAddress: String,
) {
    val context = LocalContext.current
    var to by remember {
        mutableStateOf("")
    }

    Column {
        OutlinedTextField(value = to, onValueChange = {
            to = it
        })
        Button(
            onClick = {
                viewModel.sendNFT(to = to, tokenId = tokenId, contractAddress = contractAddress) {
                    //USED WALLET CONNECT TO SIGN TRANSACTION
                    val txRequest = System.currentTimeMillis()
                    val nonce = MainRepository.web3j.ethGetTransactionCount(
                        viewModel.address.value, DefaultBlockParameterName.LATEST).sendAsync().get();
                    MainApplication.session?.performMethodCall(
                        Session.MethodCall.SendTransaction(
                            txRequest,
                            from = viewModel.address.value,
                            contractAddress,
                            nonce.transactionCount.toString(16),
                            DefaultGasProvider.GAS_PRICE.toString(16),
                            DefaultGasProvider.GAS_LIMIT.toString(16),
                            value = BigInteger.ZERO.toString(16),
                            data = it
                        )
                    ) { resp ->
                        if (resp.id == txRequest) {
                            Log.d("RESPONSE", resp.result.toString())
                        }
                    }
                    val i = Intent(Intent.ACTION_VIEW)
                    i.data = Uri.parse("wc:")
                    context.startActivity(i)
                }
            },
        ) {
            Text("Send")
        }
    }
}