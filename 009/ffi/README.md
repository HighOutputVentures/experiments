## Foreign Function Interface API

FFI (foreign function interface) API allows users to call libraries written in
native languages that support the C ABIs (Rust, C/C++, C#, Zig, Nim, Kotlin,
etc) using Deno.dlopen.

## Getting Started

### Requirements

**[Rust](https://www.rust-lang.org/tools/install)**

```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

**[Deno](https://deno.land/manual@v1.20.6/getting_started/installation)**

```
curl -fsSL https://deno.land/x/install/install.sh | sh
```

### Creating Rust Dynamic Library

Create a Rust library, e.g.

```
// src/lib.rs

#[no_mangle]
pub extern "C" fn add(a: f64 , b: f64 ) -> f64  {
    a + b
}

#[no_mangle]
pub extern "C" fn sub(a: f64 , b: f64 ) -> f64  {
    a - b
}

#[no_mangle]
pub extern "C" fn mul(a: f64 , b: f64 ) -> f64  {
    a * b
}

#[no_mangle]
pub extern "C" fn div(a: f64 , b: f64 ) -> f64  {
    a / b
}
```

Then compile it with crate-type cdylib

```
# Cargo.toml
[package]
name = "rust"
version = "0.1.0"
edition = "2018"

[lib]
name = "ops"
path = "src/lib.rs"
crate-type = ["cdylib"]
```

Run

```
rustc --crate-type cdylib src/lib.rs 
or
cargo build
```

It will generate a target folder.

Call the library from Deno:

```
// mod.ts

// Determine library extension based on
// your OS.
let libSuffix = "";
switch (Deno.build.os) {
  case "windows":
    libSuffix = "dll";
    break;
  case "darwin":
    libSuffix = "dylib";
    break;
  case "linux":
    libSuffix = "so";
    break;
}

const libName = `./libops.${libSuffix}`;
// Open library and define exported symbols
const dylib = Deno.dlopen(libName, {
  "add": { parameters: ["f64", "f64"], result: "f64" },
});

// Call the symbol `add`
const result = dylib.symbols.add(35, 34); // 69

console.log(`Result from external addition of 35 and 34: ${result}`);
```

Then run with:

```
deno run --allow-ffi --unstable mod.ts
```
