import { Base64 } from 'https://deno.land/x/bb64/mod.ts';
(async () => {
	const result = crypto.getRandomValues(new Uint8ClampedArray(11));
	const buffer = Uint8Array.from([0, ...result]);
	console.log(buffer);
	const hex = [...buffer].map((b) => b.toString(16).padStart(2, '0')).join(
		'',
	);
	console.log(hex, hex.length);
	const first = hex.slice(0, 2);
	console.log(parseInt(first, 16));
})();
