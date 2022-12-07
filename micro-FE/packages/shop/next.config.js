// @ts-check

const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["media.graphassets.com"],
  },
  webpack(config, options) {
    const { isServer } = options;
    const directory = isServer ? "ssr" : "chunks";

    config.experiments = { topLevelAwait: true };
    config.plugins.push(
      new NextFederationPlugin({
        name: "shop",
        remotes: {},
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
