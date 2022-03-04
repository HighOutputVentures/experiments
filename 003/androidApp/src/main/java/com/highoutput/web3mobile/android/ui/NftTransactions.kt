package com.highoutput.web3mobile.android.ui

import android.util.Log
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.text.selection.SelectionContainer
import androidx.compose.material.Button
import androidx.compose.material.CircularProgressIndicator
import androidx.compose.material.OutlinedTextField
import androidx.compose.material.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import coil.compose.rememberImagePainter
import com.highoutput.web3mobile.android.MainApplication
import com.highoutput.web3mobile.android.MainViewModel

const val DEFAULT_IMAGE = "https://www.truesupreme.com/wp-content/uploads/2017/04/default-image.jpg"

@Composable
fun NftTransactions(navHostController: NavHostController, viewModel: MainViewModel) {
    var address by remember {
        mutableStateOf("")
    }
    val state = viewModel.state.value
    val endReached = viewModel.endReached.value
    val isLoading = viewModel.isLoading.value

    LaunchedEffect(key1 = viewModel.address.value) {
        if (viewModel.address.value.isNotEmpty()) {
            viewModel.loadNFTImages(viewModel.address.value)
        }
    }

    Column {
        OutlinedTextField(
            value = address,
            onValueChange = { value ->
                address = value
            },
        )
        Button(onClick = { viewModel.loadNFTImages(address) }) {
            Text(text = "Load NFTs")
        }
        LazyColumn {
            val itemCount = state.transactions.size
            items(itemCount) { index ->
                if (index >= itemCount - 1 && !endReached && !isLoading) {
                    viewModel.loadNFTImages(address)
                }
                val item = state.transactions[index]
                Column(modifier = Modifier.padding(16.dp)) {
                    Image(
                        painter = rememberImagePainter(item.metadata?.image),
                        contentDescription = null,
                        contentScale = ContentScale.Fit,
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(120.dp),
                    )
                    Text("Token Name: ${item.metadata?.name}")
                    SelectionContainer() {
                        Column() {
                            Text("Token ID: ${item.tokenId}")
                            Text("Token Address: ${item.tokenAddress}")
                        }
                    }

                    Button(onClick = {
                        navHostController.navigate(Screen.SendNFT.withArgs(item.tokenId, item.tokenAddress))
                    }) {
                        Text("Send NFT")
                    }
                }
            }
        }
        if (isLoading) {
            Box(modifier = Modifier.fillMaxWidth(), contentAlignment = Alignment.Center) {
                CircularProgressIndicator()
            }
        }
    }
}