import { sum } from 'https://deno.land/x/ramda@v0.27.2/mod.ts';

async function benchmark(file: string, runs: number) {
	const results = [];

	for (let i = 0; i < runs; i++) {
		const start = Date.now();

		await Deno.readTextFile(file);

		const stop = Date.now();

		results.push((stop - start) / 1000);
	}

	console.log(
		'average reading time:',
		(sum(results)) / (results.length),
		'ms',
	);
}

benchmark('../resources/test.txt', 1000);
