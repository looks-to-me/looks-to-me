import { common } from '@agaroot/eslint-config-common';
import { define } from '@agaroot/eslint-config-definer';
import { javascript } from '@agaroot/eslint-config-javascript';
import { jest } from '@agaroot/eslint-config-jest';
import { style } from '@agaroot/eslint-config-style';
import { typescript } from '@agaroot/eslint-config-typescript';

export const config = define([
  common,
  javascript,
  typescript,
  style,
  jest,
]);

export default config({
  tsconfigPath: './tsconfig.json',
});
