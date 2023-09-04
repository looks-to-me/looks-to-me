const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const { merge } = require('webpack-merge');

const withVanillaExtract = createVanillaExtractPlugin();

module.exports = phase => {
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    transpilePackages: [
      '@looks-to-me/package-image-cache',
    ],
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    images: {
      disableStaticImages: true,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com',
        },
      ],
    },
    experimental: {
      typedRoutes: true,
      serverActions: true,
    },
    rewrites: async () => [
      {
        source: '/storybook/',
        destination: '/storybook/index.htm',
      },
    ],
    redirects: async () => [
      {
        source: '/%40:username/',
        destination: '/@:username/',
        permanent: true,
      },
    ],
    webpack: config => {
      return merge(config, {
        module: {
          rules: [
            {
              test: /\.svg$/,
              exclude: /icon\.svg$/,
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

  if (phase !== PHASE_DEVELOPMENT_SERVER) {
    nextConfig.images = {
      ...nextConfig.images,
      loader: 'custom',
      loaderFile: './next.loader.js',
    };
  }

  return withVanillaExtract(nextConfig);
};
