package com.highoutput.web3mobile.android.ui

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.Button
import androidx.compose.material.OutlinedTextField
import androidx.compose.material.Text
import androidx.compose.runtime.*
import androidx.navigation.NavHostController
import com.highoutput.web3mobile.android.MainViewModel

@Composable
fun NftTransactions(navHostController: NavHostController, viewModel: MainViewModel) {
    var address by remember {
        mutableStateOf("")
    }
    val transactions = viewModel.nftTransactions.value

    Column {
        OutlinedTextField(
            value = address,
            onValueChange = { value ->
                address = value
            },
        )
        Button(onClick = { viewModel.loadNfts(address) }) {
            Text(text = "Load NFTs")
        }
        LazyColumn {
            items(transactions.size) { index ->
                val item = transactions[index]
                if(address == item.to){
                    Text(text = "${item.tokenName} ${item.tokenID}")
                }
            }
        }
    }
}