import { style } from '@vanilla-extract/css';

import { theme } from '../../../_theme';

export const avatar = style({
  cursor: 'pointer',
  fontSize: '2rem',
});

export const account = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export const accountName = style({
  fontWeight: 600,
});

export const displayName = style({
  fontWeight: 400,
  color: theme.color.token.semantic.textMuted,
});
