# Strapi-v4 Plugin Development

## Goal Statement

At the end of this exploration, we should be able to do the following;

- Initialize a plugin project using Strapi cli
- Setup dev environment to enable hot-reloading
- Learn the native ORM provided by Strapi to access the DB seamlessly
- Finalize and deploy a plugin

## Abstract

## Resources

## Documentation

## Strapi-v4 sample project creation:

We can easily create a Strapi app using npx.

```jsx
npx create-strapi-app *Project Name*
```

and it will generate the following files

![Untitled](Strapi-v4%20Plugin%20Development%2062787077a7a04ca193abd6e09610e9eb/Untitled.png)

File structure ([https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/file-structure.html](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/file-structure.html))

```
. # root of the application
├──── .cache # files used to build the admin panel
├──── .tmp
├────build # build of the admin panel
├──── config # API configurations
│     ├api.js
│     ├admin.js
│     ├cron-tasks.js
│     ├database.js
│     ├middlewares.js
│     ├plugins.js
│     └server.js
├──── database
│     └──── migrations
├──── node_modules # npm packages used by the project
├────public # files accessible to the outside world
│     └──── uploads
├──── src
│     ├──── admin # admin customization files
│           ├────extensions # files to extend the admin panel
│     │     ├app.js
│     │     └webpack.config.js
│     ├──── api # business logic of the project split into subfolders per API
│     │     └──── (api-name)
│     │           ├────content-types
│     │           │     └──── (content-type-name)
│     │           │           └lifecycles.js
│     │           │           └schema.json
│     │           ├────controllers
│     │           ├────middlewares
│     │           ├────policies
│     │           ├────routes
│     │           ├────services
│     │           └ index.js
│     ├────components
│     │     └──── (category-name)
│     │           ├ (componentA).json
│     │           └ (componentB).json
│     ├────extensions # files to extend installed plugins
│     │     └──── (plugin-to-be-extended)
│     │           ├──── content-types
│     │           │     └──── (content-type-name)
│     │           │           └ schema.json
│     │           └strapi-server.js
│     ├────middlewares
│     │     └──── (middleware-name)
│     │           ├ defaults.json
│     │           └ index.js
│     ├────plugins # local plugins files
│     │     └──── (plugin-name)
│     │           ├──── admin
│     │           │     └──── src
│     │           │           └index.js
│     │           ├────server
│     │           │     ├────content-types
│     │           │     ├────controllers
│     │           │     └────policies
│     │           ├ package.json
│     │           ├strapi-admin.js
│     │           └strapi-server.js
│     ├───policies
│     └index.js # include register(), bootstrap() and destroy() functions
├.env
└ package.json
```

once the project creations done, it will automatically run the project via _strapi develop_ command and you will be asked to create the Admin User

![Untitled](Strapi-v4%20Plugin%20Development%2062787077a7a04ca193abd6e09610e9eb/Untitled%201.png)

![Untitled](Strapi-v4%20Plugin%20Development%2062787077a7a04ca193abd6e09610e9eb/Untitled%202.png)

### Plugin Initialization

to initialize a plugin you'll need to run the below command

```jsx
npm run strapi generate plugin
```

and then you will be asked for the plugin name

![Untitled](Strapi-v4%20Plugin%20Development%2062787077a7a04ca193abd6e09610e9eb/Untitled%203.png)

once set, it will generate the plugin on **src/plugins** directory

![Untitled](Strapi-v4%20Plugin%20Development%2062787077a7a04ca193abd6e09610e9eb/Untitled%204.png)

to enable the plugin, you will need to add it to the plugins.js under **config/** directory

```jsx
module.exports = {
  //
  graphql: {
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 7,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
  "ad-create": {
    enabled: true,
    resolve: "./src/plugins/ad-create",
  },
};
```

### Running the project in dev mode

by running the project in dev mode, you’ll enable the hot-module-reload feature and you'll be able to see your changes without rebuilding the admin panel. to run it on dev mode just run

```jsx
strapi develop -- --watch-admin
```

![Untitled](Strapi-v4%20Plugin%20Development%2062787077a7a04ca193abd6e09610e9eb/Untitled%205.png)

## Goal Statement

At the end of this exploration, we should be able to do the following;

- Initialize a plugin project using Strapi cli
- Setup dev environment to enable hot-reloading
- Learn the native ORM provided by Strapi to access the DB seamlessly
- Finalize and deploy a plugin

## Abstract

## Resources

## Documentation

## Strapi-v4 sample project creation:

We can easily create a Strapi app using npx.

```jsx
npx create-strapi-app *Project Name*
```

and it will generate the following files

![Untitled](Strapi-v4%20Plugin%20Development%2062787077a7a04ca193abd6e09610e9eb/Untitled.png)

File structure ([https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/file-structure.html](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/file-structure.html))

```
. # root of the application
├──── .cache # files used to build the admin panel
├──── .tmp
├────build # build of the admin panel
├──── config # API configurations
│     ├api.js
│     ├admin.js
│     ├cron-tasks.js
│     ├database.js
│     ├middlewares.js
│     ├plugins.js
│     └server.js
├──── database
│     └──── migrations
├──── node_modules # npm packages used by the project
├────public # files accessible to the outside world
│     └──── uploads
├──── src
│     ├──── admin # admin customization files
│           ├────extensions # files to extend the admin panel
│     │     ├app.js
│     │     └webpack.config.js
│     ├──── api # business logic of the project split into subfolders per API
│     │     └──── (api-name)
│     │           ├────content-types
│     │           │     └──── (content-type-name)
│     │           │           └lifecycles.js
│     │           │           └schema.json
│     │           ├────controllers
│     │           ├────middlewares
│     │           ├────policies
│     │           ├────routes
│     │           ├────services
│     │           └ index.js
│     ├────components
│     │     └──── (category-name)
│     │           ├ (componentA).json
│     │           └ (componentB).json
│     ├────extensions # files to extend installed plugins
│     │     └──── (plugin-to-be-extended)
│     │           ├──── content-types
│     │           │     └──── (content-type-name)
│     │           │           └ schema.json
│     │           └strapi-server.js
│     ├────middlewares
│     │     └──── (middleware-name)
│     │           ├ defaults.json
│     │           └ index.js
│     ├────plugins # local plugins files
│     │     └──── (plugin-name)
│     │           ├──── admin
│     │           │     └──── src
│     │           │           └index.js
│     │           ├────server
│     │           │     ├────content-types
│     │           │     ├────controllers
│     │           │     └────policies
│     │           ├ package.json
│     │           ├strapi-admin.js
│     │           └strapi-server.js
│     ├───policies
│     └index.js # include register(), bootstrap() and destroy() functions
├.env
└ package.json
```

once the project creations done, it will automatically run the project via _strapi develop_ command and you will be asked to create the Admin User

![Untitled](Strapi-v4%20Plugin%20Development%2062787077a7a04ca193abd6e09610e9eb/Untitled%201.png)

![Untitled](Strapi-v4%20Plugin%20Development%2062787077a7a04ca193abd6e09610e9eb/Untitled%202.png)

### Plugin Initialization

to initialize a plugin you'll need to run the below command

```jsx
npm run strapi generate plugin
```

and then you will be asked for the plugin name

![Untitled](Strapi-v4%20Plugin%20Development%2062787077a7a04ca193abd6e09610e9eb/Untitled%203.png)

once set, it will generate the plugin on **src/plugins** directory

![Untitled](Strapi-v4%20Plugin%20Development%2062787077a7a04ca193abd6e09610e9eb/Untitled%204.png)

to enable the plugin, you will need to add it to the plugins.js under **config/** directory

```jsx
module.exports = {
  //
  graphql: {
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 7,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
  "ad-create": {
    enabled: true,
    resolve: "./src/plugins/ad-create",
  },
};
```

### Running the project in dev mode

by running the project in dev mode, you’ll enable the hot-module-reload feature and you'll be able to see your changes without rebuilding the admin panel. to run it on dev mode just run

```jsx
strapi develop -- --watch-admin
```

![Untitled](Strapi-v4%20Plugin%20Development%2062787077a7a04ca193abd6e09610e9eb/Untitled%205.png)
