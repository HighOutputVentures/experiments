// @deno-types="./rust/pkg/test.d.ts"
import wasm from './rust/pkg/test.js';
const result = await wasm();
console.log(result.square(2));

/*
const wasmCode = await Deno.readFile(
	'./rust/pkg/test_bg.wasm',
);
const wasmModule = new WebAssembly.Module(wasmCode);
const wasmInstance = new WebAssembly.Instance(wasmModule, {});
const { square } = wasmInstance.exports as {
	square: (value: number) => number;
};
console.log(square(3));
*/
