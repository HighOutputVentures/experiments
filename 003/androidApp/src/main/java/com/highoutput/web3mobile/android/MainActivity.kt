package com.highoutput.web3mobile.android

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.NavDestination.Companion.hierarchy
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavHost
import androidx.navigation.NavType
import androidx.navigation.compose.*
import androidx.navigation.navArgument
import com.highoutput.web3mobile.android.ui.AssetList
import com.highoutput.web3mobile.android.ui.NftTransactions
import com.highoutput.web3mobile.android.ui.Screen
import com.highoutput.web3mobile.android.ui.SendNFT
import dagger.hilt.android.AndroidEntryPoint
import org.walletconnect.Session
import org.web3j.crypto.Hash
import org.web3j.protocol.Web3j
import org.web3j.utils.Convert
import java.nio.charset.StandardCharsets
import javax.inject.Inject

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    private lateinit var viewModel: MainViewModel

    @Inject
    lateinit var web3j: Web3j

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val items = listOf(
            Screen.AssetList,
            Screen.NftTransactions,
        )

        setContent {
            val navController = rememberNavController()
            Scaffold(
                bottomBar = {
                    BottomNavigation {
                        val navBackStackEntry by navController.currentBackStackEntryAsState()
                        val currentDestination = navBackStackEntry?.destination
                        items.forEach { screen ->
                            BottomNavigationItem(
                                icon = { Icon(Icons.Filled.Favorite, contentDescription = null) },
                                label = { Text(screen.route) },
                                selected = currentDestination?.hierarchy?.any { it.route == screen.route } == true,
                                onClick = {
                                    navController.navigate(screen.route) {
                                        // Pop up to the start destination of the graph to
                                        // avoid building up a large stack of destinations
                                        // on the back stack as users select items
                                        popUpTo(navController.graph.findStartDestination().id) {
                                            saveState = true
                                        }
                                        // Avoid multiple copies of the same destination when
                                        // reselecting the same item
                                        launchSingleTop = true
                                        // Restore state when reselecting a previously selected item
                                        restoreState = true
                                    }
                                }
                            )
                        }
                    }
                }
            ) { innerPadding ->
                NavHost(navController,
                    startDestination = Screen.AssetList.route,
                    Modifier.padding(innerPadding)) {
                    composable(Screen.AssetList.route) { AssetList(navController) }
                    navigation(startDestination = "username", route = "login") {
                        composable(
                            Screen.NftTransactions.route,
                        ) { NftTransactions(navController) }
                        composable(
                            Screen.SendNFT.route + "/{tokenId}/{contractAddress}",
                            arguments = listOf(
                                navArgument("tokenId") {
                                    type = NavType.StringType
                                    defaultValue = ""
                                    nullable = false
                                },
                                navArgument("contractAddress") {
                                    type = NavType.StringType
                                    defaultValue = ""
                                    nullable = false
                                }
                            ),
                        ) { entry ->
                            SendNFT(navController = navController,
                                web3j = web3j,
                                tokenId = entry.arguments?.getString("tokenId") ?: "",
                                contractAddress = entry.arguments?.getString("contractAddress")
                                    ?: "")
                        }
                    }
                }
            }
        }
    }
}
