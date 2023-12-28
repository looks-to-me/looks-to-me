import { style } from '@vanilla-extract/css';

import { theme } from '../../../../themes';

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
  fontSize: theme.size.font.medium,
  fontWeight: 600,
  lineHeight: 1,
});

export const displayName = style({
  color: theme.color.token.semantic.textMuted,
  fontWeight: 400,
  lineHeight: 1,
});
