import { style } from '@vanilla-extract/css';

import { theme } from './_theme';

export const body = style({
  color: theme.color.tokens.text,
  backgroundColor: theme.color.tokens.background,
});
