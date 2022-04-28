const { readFile } = require("fs").promises;
const R = require('ramda');

async function benchmark(file, runs) {

  const results = [];

  for (let i = 0; i < runs; i++) {
    const start = Date.now();

    await readFile(file, {
      encoding: "utf8",
    });

    const stop = Date.now();

    results.push((stop - start) / 1000);
  }

  console.log(
    'average reading time:',
    (R.sum(results)) / (results.length),
    'ms',
  );
}

benchmark('../resources/test.txt', 1000);
