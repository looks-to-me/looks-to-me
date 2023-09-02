import { style } from '@vanilla-extract/css';

import { theme } from '../../../_theme';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: "1.5rem",
  padding: "2rem 1rem"
});

export const brand = style({
  margin: '0 auto',
  maxWidth: '300px',
});

export const paragraph = style({
  margin: '0',
  lineHeight: 1.6,
  alignSelf: 'center',
});

export const buttonArea = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
});

export const annotation = style({
  margin: '0',
  lineHeight: 1.6,
  color: theme.color.token.semantic.textMuted,
  alignSelf: 'center',
});
