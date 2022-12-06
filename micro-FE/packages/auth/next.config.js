// @ts-check

const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false,
      },
    ];
  },
  webpack(config, options) {
    const { isServer } = options;
    const directory = isServer ? "ssr" : "chunks";

    config.experiments = { topLevelAwait: true };
    config.plugins.push(
      new NextFederationPlugin({
        name: "auth",
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
