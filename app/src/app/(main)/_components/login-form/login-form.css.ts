import { style } from '@vanilla-extract/css';

import { theme } from '../../../_theme';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '8px',
});

export const paragraph = style({
  margin: '0',
  lineHeight: 1.5,
  alignSelf: 'center',
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
  alignSelf: 'center',
});
