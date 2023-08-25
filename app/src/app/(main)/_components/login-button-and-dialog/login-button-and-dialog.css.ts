import { style } from '@vanilla-extract/css';

import { theme } from '../../../_theme';

export const content = style({
  width: '400px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '8px',
});

export const buttonArea = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
});

export const annotation = style({
  color: theme.color.token.semantic.textMuted,
});
