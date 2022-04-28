const { readFile, writeFile } = require("fs").promises;
const R = require('ramda');

async function benchmark(file, runs) {

  const results = [];

  const data = await readFile(file, {
    encoding: "utf8",
  });

  for (let i = 0; i < runs; i++) {
    const start = Date.now();

    await writeFile(`./output.txt`, data);

    const stop = Date.now();

    results.push((stop - start) / 1000);
  }

  console.log(
    'average writing time:',
    (R.sum(results)) / (results.length),
    'ms',
  );
}

benchmark('../resources/test.txt', 1000);
