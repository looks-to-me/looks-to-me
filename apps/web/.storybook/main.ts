import { createRequire } from 'node:module';

import { VanillaExtractPlugin } from '@vanilla-extract/webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import type { StorybookConfig } from '@storybook/nextjs';

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: [
    '../public',
    '../node_modules/@looks-to-me/package-database/migrations',
  ],
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        plugins: [
          new VanillaExtractPlugin(),
          new MiniCssExtractPlugin(),
        ],
        rules: [
          {
            test: /\.css$/,
            exclude: /\.vanilla\.css$/,
            sideEffects: true,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {},
              },
            ],
          },
          {
            test: /\.vanilla\.css$/i,
            sideEffects: true,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: require.resolve('css-loader'),
                options: {
                  url: false,
                },
              },
            ],
          },
        ],
      },
    },
  ],
};

export default config;
