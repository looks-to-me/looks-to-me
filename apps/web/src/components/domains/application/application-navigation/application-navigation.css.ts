import { theme } from '@looks-to-me/package-ui-theme';
import { style } from '@vanilla-extract/css';

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
