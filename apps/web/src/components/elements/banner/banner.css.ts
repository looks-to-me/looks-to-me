import { theme } from '@looks-to-me/package-ui-theme';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  justifyContent: 'center',
  padding: '10px',
  fontWeight: 600,
  color: theme.color.token.banner.text,
  backgroundColor: theme.color.token.banner.background,
  borderBottom: `solid 1px ${theme.color.token.banner.border}`,
});
