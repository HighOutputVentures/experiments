# Svelte with Webpack ModuleFederationPlugin

- The easiest way to setup a svelte webpack project is using degit. Open terminal and run this

```
npx degit sveltejs/template-webpack app2

cd app2

npm install
```

- Enable typescript

```
node scripts/setupTypescript.js
```

- Open up `webpack.config.js` and add these code under plugins

```js
new webpack.container.ModuleFederationPlugin({
  name: "app2",
  filename: "remote-entry.js",
  remotes: {},
  exposes: {
    "./index": "./src/App.svelte",
  },
  shared: {},
});
```

also, you might need to import bootstrap first

```js
const webpack = require("webpack");
```

- npm run dev
