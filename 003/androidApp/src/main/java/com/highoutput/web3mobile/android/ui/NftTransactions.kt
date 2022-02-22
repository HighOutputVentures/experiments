package com.highoutput.web3mobile.android.ui

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.Button
import androidx.compose.material.OutlinedTextField
import androidx.compose.material.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import coil.compose.rememberImagePainter
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
                Column(modifier = Modifier.padding(16.dp)) {
                    Image(
                        painter = rememberImagePainter(item.image),
                        contentDescription = null,
                        modifier = Modifier.size(128.dp)
                    )
                    Text("Token Name: ${item.nftResult.tokenName}")
                    Text("Token ID: ${item.nftResult.tokenID}")
                }
            }
        }
    }
}