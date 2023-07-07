const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  rewrites: async () => [
    {
      source: '/storybook/',
      destination: '/storybook/index.htm',
    },
  ],
};

module.exports = withVanillaExtract(nextConfig);
