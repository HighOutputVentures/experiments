package com.highoutput.web3mobile.android.models

data class LastSale(
    val asset: Asset,
    val asset_bundle: Any,
    val auction_type: Any,
    val created_date: String,
    val event_timestamp: String,
    val event_type: String,
    val payment_token: PaymentToken,
    val quantity: String,
    val total_price: String,
    val transaction: Transaction
)