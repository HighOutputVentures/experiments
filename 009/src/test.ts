(async () => {
	const result = crypto.getRandomValues(new Uint8ClampedArray(11));
	let buffer = Uint8Array.from([0, ...result]);
	console.log(buffer);
	const hex = [...buffer].map((b) => b.toString(16).padStart(2, '0')).join(
		'',
	);
	console.log(hex, hex.length);
	const first = hex.slice(0, 2);
	console.log(parseInt(first, 16));
	console.log(
		Uint8Array.from(
			hex.split(/(?=(?:..)*$)/).map((byte) => parseInt(byte, 16)),
		),
	);
})();
