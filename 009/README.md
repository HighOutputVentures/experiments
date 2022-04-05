## Authors

## Goal Statements

At the end of this experiment, we should be able to;

Create a Kanban Board GraphQL API that runs in deno with these features:

[ ] Authenticate with OTP

[X] Implement Dataloaders

[X] Upload Files

[X] Manage Database (MongoDB)

[ ] Implement GraphQL Directives

[ ] Dockerize Deno

[ ] CI/CD

[ ] Going Live
 
## Abstract

## Conclusion

## Resources

- [deno](https://deno.land)

- [oak_graphql](https://deno.land/x/oak_graphql@0.6.2)

- [vscode_deno](https://deno.land/manual@v1.16.4/vscode_deno)

- [linter](https://deno.land/manual@v1.16.4/tools/linter)

- [node/module](https://deno.land/std@0.131.0/node/module.ts)

- [jspm](https://jspm.org/)

- [skypack](https://www.skypack.dev/blog/2021/02/skypack-npm-packages-in-deno/?msclkid=b1d7e517b49311ec92bf4819b0376ab6/)

- [testing](https://deno.land/manual/testing?msclkid=b59202a3b49411eca923f8e15be0f1d4)

## Getting Started

**With Visual Studio Code**

Install
[vscode_deno](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno)
in vscode extensions, when installed, it will connect to the language server
built into the Deno CLI. Deno is not enabled in vscode by default and needs to
manually set "deno.enable" to true.

I suggest you create a different workspace vscode settings. In your project
folder, create a new file `.vscode/settings.json` :

```json
// .vscode/settings.json
{
  "deno.enable": true,
  "deno.lint": true,
  "deno.config": "./tsconfig.json",
  "deno.cache": "./cache",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "denoland.vscode-deno"
}
```

More information can be found in
the [Using Visual Studio Code](https://deno.land/manual@v1.16.4/vscode_deno) section
of the manual.

**Linter**

Deno ships with a built-in code linter for JavaScript and TypeScript.

```json
# lint all JS/TS files in the current directory and subdirectories
deno lint
# lint specific files
deno lint myfile1.ts myfile2.ts
# lint all JS/TS files in specified directory and subdirectories
deno lint src/
# print result as JSON
deno lint --json
# read from stdin
cat file.ts | deno lint -
```

Deno v1.14 and above linter can be customized using either a config file or cli
flags.

```json
// tsconfig.json
{
  "compilerOptions": {
    "allowJs": true,
    "lib": ["deno.window"]
  },
  "lint": {
    "files": {
      "include": ["src/"],
      "exclude": ["src/testdata/"]
    },
    "rules": {
      "tags": ["recommended"],
      "include": ["ban-untagged-todo"],
      "exclude": ["no-unused-vars"]
    }
  },
  "fmt": {
    "files": {
      "include": ["src/"],
      "exclude": ["src/testdata/"]
    },
    "options": {
      "useTabs": true,
      "lineWidth": 80,
      "indentWidth": 4,
      "singleQuote": true,
      "proseWrap": "preserve"
    }
  }
}
```

## Using NPM Packages
  Deno has a node compatibility module, which helps us to use npm packages that do not use non-polyfilled node.js APIs.

  **Using node_modules**
  
  To use npm modules in Deno, we need to import a createRequire from the https://deno.land/std/node/module.ts URL that gives us a require() function for loading the CommonJS modules.

  ```
  // app.ts
  import { createRequire } from "https://deno.land/std@0.131.0/node/module.ts";

  const require = createRequire(import.meta.url);
  // Loads native module polyfill.
  const path = require("path");
  // Loads extensionless module.
  const cjsModule = require("./my_mod");
  // Visits node_modules.
  const leftPad = require("left-pad");
  ```

  ```
  deno run --unstable --allow-read=node_modules app.ts
  ```

  *Note: the npm package should be in the node_modules folder in the current working directory*

  **Using Module CDN**

  There are a lot of module cdn that can load npm packages but for me [skypack](https://www.skypack.dev/) is best to use.

  If a popular npm package depends on a Node.js native built-in like `stream`, skypack automatically swap that with its matching Deno `std` compatibility polyfill.
  ```
  // Old code: 🚫 doesn’t work in Deno without a manual alias
  import stream from 'stream';

  // New code: ✅ uses Deno’s compatibility library instead
  import stream from 'https://deno.land/std/node/stream.ts'; 
  ```
  Loading TypeScript types from Skypack is as easy as adding a ?dts to the end of any URL, e.g. https://cdn.skypack.dev/dataloader?dts.

## Testing
  Deno has a built-in test runner that you can use for testing JavaScript or TypeScript code.

  Register a test case using Deno.test() function:
  ```
  // url_test.ts
  import { assertEquals } from "https://deno.land/std@0.133.0/testing/asserts.ts";

  Deno.test("url test", () => {
    const url = new URL("./foo.js", "https://deno.land/");
    assertEquals(url.href, "https://deno.land/foo.js");
  });
  ```
  Secondly, run the test using deno test subcommand.
  ```
  $ deno test url_test.ts
  running 1 test from file:///dev/url_test.js
  test url test ... ok (2ms)

  test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out
  ```
  **Filtering**
  
  Assuming the following tests:
  ```
  Deno.test({ name: "my-test", fn: myTest });
  Deno.test({ name: "test-1", fn: test1 });
  Deno.test({ name: "test2", fn: test2 });
  ```
  This command will run all of these tests because they all contain the word "test":
  ```
  deno test --filter "test" tests/
  ```
  To let Deno know that you want to use a pattern, wrap your filter with forward-slashes like the JavaScript syntactic sugar for a REGEX.:
  ```
  deno test --filter "/test-*\d/" tests/
  ```
  Sometimes you want to ignore tests based on some sort of condition (for example you only want a test to run on Windows). For this you can use the ignore boolean in the test definition. If it is set to true the test will be skipped:
  ```
  Deno.test({
    name: "do macOS feature",
    ignore: Deno.build.os !== "darwin",
    fn() {
      doMacOSFeature();
    },
  });
  ```
  Sometimes you may be in the middle of a problem within a large test class and you would like to focus on just that test and ignore the rest for now. For this you can use the only option to tell the test framework to only run tests with this set to true:
  ```
  Deno.test({
    name: "Focus on this test only",
    only: true,
    fn() {
      testComplicatedStuff();
    },
  });
  ```
  *Note: setting `only` does not apply globally*

  **Failing Fast**
  If you have a long-running test suite and wish for it to stop on the first failure, you can specify the --fail-fast flag when running the suite:
  ```
  deno test --fail-fast
  ```

  **Parallel Execution**
  By default, the test runner queues all the test files/suites and executes them one-by-one. This gets slow when the test suite is big.
  
  To run multiple test suites in parallel using workers, a parameter called jobs can be provided to the test command:
  ```
  deno test --jobs 3
  ```
