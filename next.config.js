const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const { merge } = require('webpack-merge');

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    disableStaticImages: true,
  },
  experimental: {
    typedRoutes: true,
  },
  trailingSlash: true,
  rewrites: async () => [
    {
      source: '/storybook/',
      destination: '/storybook/index.htm',
    },
  ],
  webpack: config => {
    return merge(config, {
      module: {
        rules: [
          {
            test: /\.svg$/,
            use: [{
              loader: '@svgr/webpack',
              options: { icon: true, ref: true },
            }],
          },
        ],
      },
    });
  },
};

module.exports = withVanillaExtract(nextConfig);
