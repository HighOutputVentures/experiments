package com.highoutput.web3mobile.android.ui

import android.content.Intent
import android.net.Uri
import android.util.Log
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.Button
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.highoutput.web3mobile.android.MainApplication
import com.highoutput.web3mobile.android.MainViewModel
import org.walletconnect.Session

@Composable
fun AssetList(navController: NavController, viewModel: MainViewModel) {
    val context = LocalContext.current
    val connectionStatus = viewModel.connectionStatus.value
    val address = viewModel.address.value

    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Text("Status: $connectionStatus")
        if (connectionStatus.isEmpty()) {
            Button(onClick = {
                viewModel.resetSession()
                val i = Intent(Intent.ACTION_VIEW)
                i.data = Uri.parse(MainApplication.config.toWCUri())
                context.startActivity(i)
            }) {
                Text("Connect to Metamask")
            }
        }
        Button(onClick = {
            viewModel.closeConnection()
        }) {
            Text("Shutdown")
        }
        Button(onClick = {
            val txRequest = System.currentTimeMillis()
//            val params = listOf(
//                mapOf(
//                    "from" to address,
//                    "to" to "0xadD803D79035Be0bBEbbF7495a52d81710E57386",
//                    "data" to "0x",
//                    "gas" to null,
//                    "gasPrice" to null,
//                    "value" to "0x${
//                        Convert.toWei("0.5", Convert.Unit.ETHER).toBigInteger().toString(16)
//                    }",
//                    "nonce" to null,
//                )
//            )
            val params = listOf(
                "0xdeadbeaf", "0x671E139f6818319F23272434185B4C8872036548"
            )
            Log.d("PARAMS", "$params")
            MainApplication.session?.performMethodCall(
                Session.MethodCall.Custom(
                    1,
                    "personal_sign",
                    params = params
                )
            ) { resp ->
                if (resp.id == txRequest) {
                    Log.d("RESPONSE", "${resp.result}")
                }
            }
            val i = Intent(Intent.ACTION_VIEW)
            i.data = Uri.parse("wc:")
            context.startActivity(i)
        }) {
            Text("Sign Transaction")
        }
        if (address.isNotEmpty()) {
            Column {
                Balance(viewModel = viewModel)
                Transactions(viewModel = viewModel)
            }
        }
    }
}

@Composable
fun Balance(viewModel: MainViewModel) {
    val balance = viewModel.balance.value

    Column {
        Text("Balance", fontWeight = FontWeight(600), fontSize = 24.sp)
        Text(text = balance)
    }
}

@Composable
fun Transactions(viewModel: MainViewModel) {
    val transactions = viewModel.transactions.value

    Column {
        Text("Transactions", fontWeight = FontWeight(600), fontSize = 24.sp)
        LazyColumn {
            items(transactions.size) { index ->
                Text(transactions[index])
            }
        }
    }
}