import { style } from '@vanilla-extract/css';

import { theme } from '../../../../../themes';

export const wrapper = style({
  display: 'flex',
  alignItems: 'center',
  padding: '2rem 0',
  borderBottom: `solid 1px ${theme.color.token.semantic.border}`,
});

export const menu = style({
  marginLeft: 'auto',
});
