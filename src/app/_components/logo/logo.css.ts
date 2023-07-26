import { style } from '@vanilla-extract/css';

import { theme } from '../../_theme';

export const wrapper = style({
  fontSize: '1rem',
  textDecoration: 'none',
  color: theme.color.token.semantic.text,
});

export const container = style({
  margin: 0,
  fontSize: '1rem',
});
