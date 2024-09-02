import { define } from '@agaroot/eslint-config-definer';
import { next } from '@agaroot/eslint-config-next';
import { react } from '@agaroot/eslint-config-react';

import { config as base } from '../../eslint.config.mjs';

const config = define([
  base,
  react,
  next,
  () => [{
    ignores: [
      'migrations',
      'sqlite-wasm.d.ts',
    ],
  }],
]);

export default config({
  tsconfigPath: './tsconfig.json',
});
