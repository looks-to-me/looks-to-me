import { style } from '@vanilla-extract/css';

import { theme } from '../../../_theme';

export const wrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px',
  padding: '16px',
  borderBottom: `solid 1px ${theme.color.token.semantic.border}`,
  backgroundColor: theme.color.token.semantic.backgroundInset,
});

export const logo = style({
  width: '2rem',
});

export const container = style({
  flexGrow: 1,
});
