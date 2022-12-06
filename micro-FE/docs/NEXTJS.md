# Nextjs module federation using `@module-federation/nextjs-mf`

- Scaffold a new project

```
npx create-next-app@latest app1 --use-npm --ts
```

- install `nextjs-mf`

```
npm i @module-federation/nextjs-mf
```

- modify `next.config.js`

  - remove `swcMinify`
  - add the code below

  ```js
  webpack(config, options) {
    const { isServer } = options;
    const directory = isServer ? 'ssr' : 'chunks';

    config.experiments = { topLevelAwait: true };
    config.plugins.push(
      new NextFederationPlugin({
        name: 'app1',
        // add federated module that you will consume here
        remotes: {
          'app2' : `app2@http://localhost:3001/_next/static/${directory}/remote-entry.js`
        },
        // container file of exposed modules
        filename: `static/${directory}/remote-entry.js`,
        extraOptions: {
          // exposes all pages
          exposePages: true,
          enableUrlLoaderFix: true,
          enableImageLoaderFix: true,
        },
        // add shared dependencies here
        shared: {
          clsx: '^3.0.1',
        },
        // add components/modules to expose to consumers
        exposes: {
          './header':'./src/components/header.tsx'
        }
      }),
    );

    return config;
  },
  ```
