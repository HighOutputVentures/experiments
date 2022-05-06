import {
	dirname,
	fromFileUrl,
	join,
} from 'https://deno.land/std@0.135.0/path/mod.ts';

let libSuffix = '';
switch (Deno.build.os) {
	case 'windows':
		libSuffix = 'dll';
		break;
	case 'darwin':
		libSuffix = 'dylib';
		break;
	case 'linux':
		libSuffix = 'so';
		break;
}

const libName = join(
	dirname(import.meta.url),
	`./rust/target/debug/libops.${libSuffix}`,
);
const sign = 'f64';
const dylib = Deno.dlopen(fromFileUrl(libName), {
	'add': { parameters: [sign, sign], result: sign },
	'sub': { parameters: [sign, sign], result: sign },
	'div': { parameters: [sign, sign], result: sign },
	'mul': { parameters: [sign, sign], result: sign },
});

const a = 35;
const b = 34;

console.log(
	`Addition of ${a} and ${b}: ${dylib.symbols.add(a, b)}`,
);

console.log(
	`Subtraction of ${a} and ${b}: ${dylib.symbols.sub(a, b)}`,
);

console.log(
	`Multipliation of ${a} and ${b}: ${dylib.symbols.mul(a, b)}`,
);

console.log(
	`Division of ${a} and ${b}: ${dylib.symbols.div(a, b)}`,
);
