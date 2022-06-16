/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  eslint: {
    dirs: ["./src"],
  },
};

module.exports = nextConfig;
