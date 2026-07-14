/* eslint-disable unicorn/no-thenable */

import fs from 'node:fs';
import path from 'node:path';

import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig, mergeConfig } from 'vite';

import type { StorybookConfig } from '@storybook/nextjs-vite';
import type { Plugin } from 'vite';

type MockPluginOption = {
  if: (source: string, importer: string) => boolean;
  then: (source: string) => string;
};

const mockPlugin = (options: MockPluginOption[]): Plugin => {
  return {
    name: 'mock-plugin',
    enforce: 'pre',
    resolveId: (source, importer) => {
      if (!importer || !path.isAbsolute(importer) || path.isAbsolute(source)) {
        return null;
      }

      const sourcePath = path.resolve(path.dirname(importer), source);
      const matchedOption = options.find((option) => option.if(sourcePath, importer));
      if (!matchedOption) {
        return null;
      }

      const mockPath = matchedOption.then(sourcePath);
      if (!fs.existsSync(mockPath)) {
        return null;
      }

      return { id: mockPath };
    },
  };
};

const config: StorybookConfig = {
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  staticDirs: [
    './public',
    '../public',
    '../node_modules/@looks-to-me/package-database/migrations',
  ],
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
  ],
  viteFinal: (config) => {
    return mergeConfig(config, defineConfig({
      plugins: [
        vanillaExtractPlugin(),
        mockPlugin([
          {
            if: (source) => source.endsWith('.action'),
            then: (source) => `${source}.mock.ts`,
          },
        ]),
      ],
    }));
  },
};

export default config;
