/* eslint-disable unicorn/prefer-module */

import { VanillaExtractPlugin } from '@vanilla-extract/webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { merge } from 'webpack-merge';

import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  staticDirs: [
    '../public',
    '../migrations',
  ],
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: config => {
    config.module?.rules?.forEach(rule => {
      if (!rule || typeof rule !== 'object') return;
      if (rule.test instanceof RegExp && rule.test.test('test.css')) {
        rule.exclude = /\.vanilla\.css$/i;
      }
    });

    return merge(config, {
      plugins: [
        new VanillaExtractPlugin(),
        new MiniCssExtractPlugin(),
      ],
      module: {
        rules: [
          {
            test: /\.vanilla\.css$/i,
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
    });
  },
};

export default config;
