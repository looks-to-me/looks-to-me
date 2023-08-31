import { style } from '@vanilla-extract/css';

import { theme } from '../../../../_theme';

export const breadcrumb = style({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '4px',
});

export const title = style({
  fontWeight: 600,
});

export const divider = style({
  color: theme.color.token.semantic.textMuted,
});

export const main = style({
  padding: '16px',
});
