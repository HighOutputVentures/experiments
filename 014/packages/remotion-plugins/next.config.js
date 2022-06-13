/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  eslint: {
    dirs: ["./src"],
  },
  experimental: {
    images: {
      layoutRaw: true,
    },
  },
};

module.exports = nextConfig;
