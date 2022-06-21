# Strapi-v4 Plugin Development

## Goal Statement

At the end of this exploration, we should be able to do the following;

- Initialize a plugin project using Strapi cli
- Setup dev environment to enable hot-reloading
- Learn the native ORM provided by Strapi to access the DB seamlessly
- Finalize and deploy a plugin

## Abstract

## Resources

[https://strapi.io/plugin-resources](https://strapi.io/plugin-resources)

[https://design-system-git-main-strapijs.vercel.app/](https://design-system-git-main-strapijs.vercel.app/)

[https://react-query.tanstack.com/](https://react-query.tanstack.com/)

[https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/entity-service/populate.html](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/entity-service/populate.html)

## Documentation

## Strapi-v4 sample project creation:

We can easily create a Strapi app using npx.

```jsx
npx create-strapi-app *Project Name*
```

and it will generate the following files

![Untitled](High%20Output%20Engineering%206508528a54d245a68ab72582a0124b90/Initiatives%20Tracker%2015381a3a97b4412494e9689f73f0661a/Strapi-v4%20Plugin%20Development%2059bc473b73a44f3b9790ca7aeb636dfb/Untitled.png)

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

![Untitled](High%20Output%20Engineering%206508528a54d245a68ab72582a0124b90/Initiatives%20Tracker%2015381a3a97b4412494e9689f73f0661a/Strapi-v4%20Plugin%20Development%2059bc473b73a44f3b9790ca7aeb636dfb/Untitled%201.png)

![Untitled](High%20Output%20Engineering%206508528a54d245a68ab72582a0124b90/Initiatives%20Tracker%2015381a3a97b4412494e9689f73f0661a/Strapi-v4%20Plugin%20Development%2059bc473b73a44f3b9790ca7aeb636dfb/Untitled%202.png)

### Plugin Initialization

to initialize a plugin you'll need to run the below command

```jsx
npm run strapi generate plugin
```

and then you will be asked for the plugin name

![Untitled](High%20Output%20Engineering%206508528a54d245a68ab72582a0124b90/Initiatives%20Tracker%2015381a3a97b4412494e9689f73f0661a/Strapi-v4%20Plugin%20Development%2059bc473b73a44f3b9790ca7aeb636dfb/Untitled%203.png)

once set, it will generate the plugin on **src/plugins** directory

![Untitled](High%20Output%20Engineering%206508528a54d245a68ab72582a0124b90/Initiatives%20Tracker%2015381a3a97b4412494e9689f73f0661a/Strapi-v4%20Plugin%20Development%2059bc473b73a44f3b9790ca7aeb636dfb/Untitled%204.png)

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

![Untitled](High%20Output%20Engineering%206508528a54d245a68ab72582a0124b90/Initiatives%20Tracker%2015381a3a97b4412494e9689f73f0661a/Strapi-v4%20Plugin%20Development%2059bc473b73a44f3b9790ca7aeb636dfb/Untitled%205.png)

### Strapi Design System

the new Strapiv4 comes with a Design System that can be readily used once you start a Strapi project

[https://design-system-git-main-strapijs.vercel.app/](https://design-system-git-main-strapijs.vercel.app/) (Storybook)

Let’s create a good old counter app using the provided design system.

```jsx
//src\plugins\ad-create\admin\src\pages\HomePage\index.js

import React, { memo } from "react";
import { BaseHeaderLayout, Layout } from "@strapi/design-system/Layout";
import { Flex } from "@strapi/design-system/Flex";
import Counter from "../../components/Counter";

const HomePage = () => {
  return (
    <Layout>
      <BaseHeaderLayout
        title="Hov Plugin"
        subtitle="This is a test plugin for experiment 017"
        as="h1"
      />
      <Flex
        gap="100px"
        background={"primary200"}
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        padding="30px"
      >
        <Counter />
      </Flex>
    </Layout>
  );
};
```

```jsx
//src\plugins\ad-create\admin\src\components\Counter\index.js

import React, { useState } from "react";
import { Flex } from "@strapi/design-system/Flex";
import { Button } from "@strapi/design-system/Button";
import { Typography } from "@strapi/design-system/Typography";

export const Counter = () => {
  const [value, setValue] = useState(0);

  return (
    <Flex gap="30px">
      <Button onClick={() => setValue((value) => value + 1)}>Add</Button>
      <Typography variant="alpha">{value}</Typography>
    </Flex>
  );
};

export default Counter;
```

![Untitled](High%20Output%20Engineering%206508528a54d245a68ab72582a0124b90/Initiatives%20Tracker%2015381a3a97b4412494e9689f73f0661a/Strapi-v4%20Plugin%20Development%2059bc473b73a44f3b9790ca7aeb636dfb/Untitled%206.png)

[screen-capture (23).webm](<High%20Output%20Engineering%206508528a54d245a68ab72582a0124b90/Initiatives%20Tracker%2015381a3a97b4412494e9689f73f0661a/Strapi-v4%20Plugin%20Development%2059bc473b73a44f3b9790ca7aeb636dfb/screen-capture_(23).webm>)

### heads-up!

**At this point, I renamed it to “My Products” as it describes the next app that we’ll be working on**

![Untitled](High%20Output%20Engineering%206508528a54d245a68ab72582a0124b90/Initiatives%20Tracker%2015381a3a97b4412494e9689f73f0661a/Strapi-v4%20Plugin%20Development%2059bc473b73a44f3b9790ca7aeb636dfb/Untitled%207.png)

```jsx
// src\plugins\my-products-plugin\package.json

{
  "name": "my-products-plugin",
  "version": "0.0.0",
  "description": "This is the description of the plugin.",
  "strapi": {
    "name": "My Products",
    "description": "This is a test plugin for experiment 017",
    "kind": "plugin",
    "displayName": "My Products"
  },
```

![Untitled](High%20Output%20Engineering%206508528a54d245a68ab72582a0124b90/Initiatives%20Tracker%2015381a3a97b4412494e9689f73f0661a/Strapi-v4%20Plugin%20Development%2059bc473b73a44f3b9790ca7aeb636dfb/Untitled%208.png)

### Next Step ⇒

### Product List App

so were done with some static app, let’s now proceed with more complex app that requires you to create CRUD functionality. We’ll create a “Product list app” that will let us list, add and remove products from our plugin.

To achieve this, we need two things.

- Our plugin → this is where we manipulate the product list
- Content (collection or single) → this is where we store the product list

We’re already done with the creation of the plugin, the next thing is to create Content. There are two ways of doing this, we can either contain the content inside the whole strapi project, or we can just put it inside the strapi plugin that we’ve created; we’ll let the plugin handle it.

![Untitled](High%20Output%20Engineering%206508528a54d245a68ab72582a0124b90/Initiatives%20Tracker%2015381a3a97b4412494e9689f73f0661a/Strapi-v4%20Plugin%20Development%2059bc473b73a44f3b9790ca7aeb636dfb/Untitled%209.png)

In our case, it’s better to do the latter and just let the plugin handle it.

### Collection Creation

we can create a collection directly on the Strapi Admin or via CLI

via Strapi Admin → Content Types Builder

![Untitled](High%20Output%20Engineering%206508528a54d245a68ab72582a0124b90/Initiatives%20Tracker%2015381a3a97b4412494e9689f73f0661a/Strapi-v4%20Plugin%20Development%2059bc473b73a44f3b9790ca7aeb636dfb/Untitled%2010.png)

via CLI

![Untitled](High%20Output%20Engineering%206508528a54d245a68ab72582a0124b90/Initiatives%20Tracker%2015381a3a97b4412494e9689f73f0661a/Strapi-v4%20Plugin%20Development%2059bc473b73a44f3b9790ca7aeb636dfb/Untitled%2011.png)

so we’re done with the Content creation, I’ve also added 3 products.

![Untitled](High%20Output%20Engineering%206508528a54d245a68ab72582a0124b90/Initiatives%20Tracker%2015381a3a97b4412494e9689f73f0661a/Strapi-v4%20Plugin%20Development%2059bc473b73a44f3b9790ca7aeb636dfb/Untitled%2012.png)

To access these products in our Strapi Plugin, we need to set up an endpoint.

under our /server folder, we need to modify 3 folders: routes, controllers, and services.

![Untitled](High%20Output%20Engineering%206508528a54d245a68ab72582a0124b90/Initiatives%20Tracker%2015381a3a97b4412494e9689f73f0661a/Strapi-v4%20Plugin%20Development%2059bc473b73a44f3b9790ca7aeb636dfb/Untitled%2013.png)

**Services** ⇒ This is where you directly pull the data from the database via Strapi’s **Entity Service API**.

Below is a sample code for fetching all the products inside **Product** content

```jsx
// src\plugins\my-products-plugin\server\services\product-service.js

"use strict";

module.exports = ({ strapi }) => ({
  async getProducts(query) {
    return await strapi.entityService.findMany(
      "plugin::my-products-plugin.product",
      query
    );
  },
```

```jsx
// src\plugins\my-products-plugin\server\services\index.js

"use strict";

const products = require("./product-service");

module.exports = {
  products,
};
```

**Controller** ⇒ This is the middleman between **Routes** and **Services,** this will be called by the route where you set it to be in and then this will call the service that we’ve created.

Context (ctx) of the actual request which contains the type of request, parameters, auth — etc will also be passed here. Similar to Express’ req and res.

```jsx
// src\plugins\my-products-plugin\server\controllers\products-controller.js

"use strict";

module.exports = {
  async index(ctx) {
    ctx.body = await strapi
      .plugin("my-products-plugin")
      .service("products")
      .getProducts();
  },
```

```jsx
// src\plugins\my-products-plugin\server\controllers\index.js

"use strict";

const products = require("./products-controller");

module.exports = {
  products,
};
```

**Routes** ⇒ is where you set the Endpoint Path and the Handler (controller)

```jsx
// src\plugins\my-products-plugin\server\routes\index.js

module.exports = [
  {
    method: "GET",
    path: "/getProducts",
    handler: "products.index",
    config: {
      policies: [],
    },
  },
```

Once set, you can now access your new endpoint.

![Untitled](High%20Output%20Engineering%206508528a54d245a68ab72582a0124b90/Initiatives%20Tracker%2015381a3a97b4412494e9689f73f0661a/Strapi-v4%20Plugin%20Development%2059bc473b73a44f3b9790ca7aeb636dfb/Untitled%2014.png)

![Untitled](High%20Output%20Engineering%206508528a54d245a68ab72582a0124b90/Initiatives%20Tracker%2015381a3a97b4412494e9689f73f0661a/Strapi-v4%20Plugin%20Development%2059bc473b73a44f3b9790ca7aeb636dfb/Untitled%2015.png)

### Next Step ⇒

### Use the new endpoint inside the plugin

for this example, I’ve used react-query since it’s pretty easy to set up and would require less code.

**Note**: It’s important to use the **request** helper function from Strapi as the **fetcher (**that you usually feed to SWR, React-query, etc**)** as it also contains the bearer token of the logged-in admin inside it.

```jsx
import React from "react";
import { useQuery } from "react-query";
import { request } from "@strapi/helper-plugin";

function MyProducts() {
  const { isLoading, error, data } = useQuery("getProducts", () =>
    request("/my-products-plugin/getProducts")
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default MyProducts;
```

![Untitled](High%20Output%20Engineering%206508528a54d245a68ab72582a0124b90/Initiatives%20Tracker%2015381a3a97b4412494e9689f73f0661a/Strapi-v4%20Plugin%20Development%2059bc473b73a44f3b9790ca7aeb636dfb/Untitled%2016.png)

### Plugin Demo

[screen-capture (24).gif](<Strapi-v4%20Plugin%20Development%204137d64c42924622bbd129c786cc30df/screen-capture_(24).gif>)
