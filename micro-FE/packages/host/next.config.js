// @ts-check

const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["media.graphassets.com"],
  },
  webpack(config, options) {
    const { isServer } = options;
    const directory = isServer ? "ssr" : "chunks";

    config.experiments = { topLevelAwait: true };
    config.plugins.push(
      new NextFederationPlugin({
        name: "host",
        remotes: {
          auth: "auth@http://localhost:3001/_next/static/" + directory + "/remote-entry.js",
          shop: "shop@http://localhost:3002/_next/static/" + directory + "/remote-entry.js",
          cart: "cart@http://localhost:3003/remote-entry.js",
        },
        filename: "static/" + directory + "/remote-entry.js",
        extraOptions: {
          exposePages: true,
          enableUrlLoaderFix: true,
          enableImageLoaderFix: true,
        },
        shared: {},
      }),
    );

    return config;
  },
};

module.exports = nextConfig;
