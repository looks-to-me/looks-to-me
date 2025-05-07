import { define } from '@praha/eslint-config-definer';
import { next } from '@praha/eslint-config-next';
import { react } from '@praha/eslint-config-react';

import { config as base } from '../../eslint.config.mjs';

const config = define([
  base,
  react,
  next,
  () => [{
    ignores: [
      'worker-configuration.d.ts',
    ],
  }],
]);

export default config({
  tsconfigPath: './tsconfig.json',
});
