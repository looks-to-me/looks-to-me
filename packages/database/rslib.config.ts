import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    entry: {
      index: [
        './src/**',
        '!src/**/*.test.ts',
      ],
    },
    tsconfigPath: './tsconfig.build.json',
  },
  lib: [{
    format: 'esm',
    bundle: false,
    dts: true,
  }],
});
