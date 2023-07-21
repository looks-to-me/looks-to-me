import { style } from '@vanilla-extract/css';

import { theme } from '../../_theme';

export const wrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '16px',
  borderBottom: `solid 1px ${theme.color.token.semantic.border}`,
  backgroundColor: theme.color.token.semantic.backgroundInset,
});

export const link = style({
  color: theme.color.token.semantic.text,
  textDecoration: 'none',
});

export const logo = style({
  fontSize: '1rem',
  margin: 0,
});
