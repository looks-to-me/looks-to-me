import { createRequire } from 'node:module';

import type { CodegenConfig } from '@graphql-codegen/cli';

const require = createRequire(import.meta.url);

const config: CodegenConfig = {
  schema: require.resolve('@looks-to-me/package-graphql/schema.graphql'),
  documents: [
    'src/**/*.ts',
    'src/**/*.tsx',
  ],
  generates: {
    './src/graphql/generated/': {
      preset: 'client',
      config: {
        useTypeImports: true,
        arrayInputCoercion: false,
        scalars: {
          ID: 'string',
        },
      },
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: 'getFragmentData' },
      },
    },
  },
};

export default config;
