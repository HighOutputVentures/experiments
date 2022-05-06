## WebAssembly

WebAssembly (abbreviated Wasm) is a binary instruction format for a stack-based
virtual machine. Wasm is designed as a portable compilation target for
programming languages, enabling deployment on the web for client and server
applications.

## Getting Started

### Requirements

**[Rust](https://www.rust-lang.org/tools/install)**

```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

**[wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)**

```
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
```

**[Deno](https://deno.land/manual@v1.20.6/getting_started/installation)**

```
curl -fsSL https://deno.land/x/install/install.sh | sh
```

### Creating Rust Library

Create a Rust library, e.g.

```
// src/lib.rs

#[no_mangle]
pub extern "C" fn square(x: u32) -> u32 {
    x * x
}
```

Then install `wasm-bindgen`

```
[package]
name = "rust"
version = "0.1.0"
edition = "2018"

[lib]
name = "test"
path = "src/lib.rs"
crate-type = ["cdylib", "rlib"]

[dependencies]
wasm-bindgen = "0.2.63"
console_error_panic_hook = { version = "0.1.6", optional = true }
wee_alloc = { version = "0.4.5", optional = true }

[dev-dependencies]
wasm-bindgen-test = "0.3.13"
```

Then build wasm with target `web` to allow the output js files to be imported as
ES modules:

```
wasm-pack build --target web
```

_For more build options check here:
https://rustwasm.github.io/wasm-pack/book/commands/build.html_

By default, it will generate folder `pkg`.

Call the library from Deno:

```
/**
 Run by importing the output js files
**/
// @deno-types="./rust/pkg/test.d.ts"
import wasm from './rust/pkg/test.js';
const result = await wasm();
console.log(result.square(2));

/**
 Run by importing directly the .wasm file
**/
const wasmCode = await Deno.readFile(
	'./rust/pkg/test_bg.wasm',
);
const wasmModule = new WebAssembly.Module(wasmCode);
const wasmInstance = new WebAssembly.Instance(wasmModule, {});
const { square } = wasmInstance.exports as {
	square: (value: number) => number;
};
console.log(square(3));
```

Then run with:

```
deno run --allow-read --unstable mod.ts
```

## Resources

- https://webassembly.org/
- https://rustwasm.github.io/wasm-pack
