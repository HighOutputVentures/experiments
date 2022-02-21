plugins {
    id("com.android.application")
    kotlin("android")
}

android {
    compileSdk = 31
    defaultConfig {
        applicationId = "com.highoutput.web3mobile.android"
        minSdk = 23
        targetSdk = 31
        versionCode = 1
        versionName = "1.0"
    }
    buildTypes {
        getByName("release") {
            isMinifyEnabled = false
        }
        getByName("debug") {
            isDebuggable = true
            buildConfigField("String", "ETHERSCAN_BASE_URL", "\"https://api.etherscan.io/\"")
            buildConfigField("String", "ETHERSCAN_RINKEBY_BASE_URL", "\"https://api-rinkeby.etherscan.io/\"")
            buildConfigField("String",
                "ETHERSCAN_API_KEY",
                "\"UGUGWP87BNPRYFJ4C9ZVQ7HPKCDS2QQ7RX\"")
            buildConfigField("String", "OPENSEA_BASE_URL", "\"https://api.opensea.io/api/v1/\"")
        }
    }
    buildFeatures {
        // Enables Jetpack Compose for this module
        compose = true
    }
    // Set both the Java and Kotlin compilers to target Java 8.
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = "1.8"
    }

    composeOptions {
        kotlinCompilerExtensionVersion = "1.0.5"
    }

    configurations {
        all {
            exclude(module = "conceal")
            exclude(module = "bcprov-jdk15on")
        }
    }
}

dependencies {
    implementation(project(":shared"))
    implementation("com.google.android.material:material:1.4.0")
    implementation("androidx.appcompat:appcompat:1.3.1")
    implementation("androidx.constraintlayout:constraintlayout:2.1.0")

    // Integration with activities
    implementation("androidx.activity:activity-compose:1.3.1")
    // Compose Material Design
    implementation("androidx.compose.material:material:1.0.5")
    // Animations
    implementation("androidx.compose.animation:animation:1.0.5")
    // Tooling support (Previews, etc.)
    implementation("androidx.compose.ui:ui-tooling:1.0.5")
    // Integration with ViewModels
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:1.0.0-alpha07")
    implementation("androidx.navigation:navigation-runtime-ktx:2.4.0")
    implementation("androidx.navigation:navigation-compose:2.4.0")
    // UI Tests
    androidTestImplementation("androidx.compose.ui:ui-test-junit4:1.0.5")

    //DataStore
    implementation("androidx.datastore:datastore-preferences:1.0.0")

    //WEB3J
    implementation("org.web3j:core:4.8.8-android")

    //WalletConnect
    implementation("com.github.WalletConnect:kotlin-walletconnect-lib:0.9.8")

    //KHex
    implementation("com.github.komputing.khex:extensions:1.1.2")

    //Moshi
    implementation("com.squareup.moshi:moshi-kotlin:1.13.0")

    //OkHttp
    implementation("com.squareup.okhttp3:okhttp:4.9.0")

    //Retfrofit
    implementation("com.squareup.retrofit2:retrofit:2.9.0")

    //Gson
    implementation("com.squareup.retrofit2:converter-gson:2.9.0")

    //Coil
    implementation("io.coil-kt:coil-compose:1.4.0")
}