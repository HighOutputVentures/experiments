## Authors

## Goal Statements

At the end of this experiment, we should be able to;

[ ]  Authentication with OTP

[ ]  Implement Dataloaders

[ ]  Upload Files

[ ]  Manage Database (MongoDB)

[ ]  Implement Cursor Based Pagination

## Abstract

## Conclusion

## Resources

- [deno](https://deno.land)

- [oak_graphql](https://deno.land/x/oak_graphql@0.6.2)

- [vscode_deno](https://deno.land/manual@v1.16.4/vscode_deno)

- [linter](https://deno.land/manual@v1.16.4/tools/linter)

## Documentation

**With Visual Studio Code**

Install [vscode_deno](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno) in vscode extensions, when installed, it will connect to the language server built into the Deno CLI. Deno is not enabled in vscode by default and needs to manually set "deno.enable" to true. 

I suggest you create a different workspace vscode settings. In your project folder, create a new file `.vscode/settings.json` :

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

More information can be found in the [Using Visual Studio Code](https://deno.land/manual@v1.16.4/vscode_deno) section of the manual.

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

Deno v1.14 and above linter can be customized using either a config file or cli flags.

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