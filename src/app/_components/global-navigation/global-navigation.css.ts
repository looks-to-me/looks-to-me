import { style } from '@vanilla-extract/css';

import { theme } from '../../_theme';

export const main = style({
  flexGrow: 1,
});

export const buttonLinkIcon = style({
  fontSize: theme.font.size.medium,
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

export const companyLinks = style({
  display: 'flex',
  gap: '8px',
  fontSize: theme.font.size.tiny,
});
