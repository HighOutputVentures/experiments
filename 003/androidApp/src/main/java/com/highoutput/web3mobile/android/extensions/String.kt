package com.highoutput.web3mobile.android.extensions

import org.web3j.abi.datatypes.Type
import org.web3j.utils.Convert
import org.web3j.utils.Numeric
import java.math.BigDecimal

fun String.toWei(unit: Convert.Unit = Convert.Unit.ETHER): BigDecimal = Convert.toWei(this, unit)

fun BigDecimal.toHex(): String = Numeric.toHexStringWithPrefixSafe(this.toBigInteger())

fun String.ipfsToHttp(): String {
    return "https://ipfs.io/ipfs/$this"
}