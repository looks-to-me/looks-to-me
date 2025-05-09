import { theme } from '@looks-to-me/package-ui-theme';
import { style } from '@vanilla-extract/css';

export const article = style({
  maxWidth: '800px',
  margin: '0 auto',
});

export const title = style({
  marginTop: '32px',
  paddingBottom: '8px',
  borderBottom: `solid 1px ${theme.color.token.semantic.border}`,
  fontSize: theme.size.font.large,
});
