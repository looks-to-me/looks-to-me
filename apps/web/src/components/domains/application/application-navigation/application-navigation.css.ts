import { style } from '@vanilla-extract/css';

import { theme } from '../../../../themes';

export const main = style({
  flexGrow: 1,
});

export const logo = style({
  width: '2rem',
});

export const footer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '0 10px',
});

export const copyright = style({
  color: theme.color.token.semantic.textMuted,
});

export const links = style({
  display: 'flex',
  gap: '8px',
  fontSize: theme.size.font.tiny,
});
