import { style } from '@vanilla-extract/css';

import { theme } from '../../_theme';

export const article = style({
  maxWidth: '800px',
  margin: '0 auto',
});

export const paragraph = style({
  lineHeight: 1.5,
  margin: 0,
});

export const sectionTitle = style({
  marginTop: '32px',
  paddingBottom: '8px',
  borderBottom: `solid 1px ${theme.color.token.semantic.border}`,
  fontSize: theme.size.font.large,
});

export const listItem = style({
  margin: '8px 0',
});
