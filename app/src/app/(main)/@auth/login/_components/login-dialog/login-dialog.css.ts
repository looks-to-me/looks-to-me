import { style } from '@vanilla-extract/css';

import { theme } from '../../../../../_theme';

export const wrapper = style({
  width: '100%',
  maxWidth: '420px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '8px',
});

export const paragraph = style({
  margin: '0',
});

export const buttonArea = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  margin: '16px 0',
});

export const annotation = style({
  margin: '0',
  color: theme.color.token.semantic.textMuted,
});
