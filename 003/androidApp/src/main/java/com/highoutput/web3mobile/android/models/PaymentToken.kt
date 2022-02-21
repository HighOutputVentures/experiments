package com.highoutput.web3mobile.android.models

data class PaymentToken(
    val address: String,
    val decimals: Int,
    val eth_price: Double,
    val id: Int,
    val image_url: String,
    val name: String,
    val symbol: String,
    val usd_price: Double
)