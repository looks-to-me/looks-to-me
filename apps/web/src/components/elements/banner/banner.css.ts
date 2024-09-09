import { style } from '@vanilla-extract/css';

import { theme } from '../../../themes';

export const wrapper = style({
  display: 'flex',
  justifyContent: 'center',
  padding: '10px',
  fontWeight: 600,
  color: theme.color.token.banner.text,
  backgroundColor: theme.color.token.banner.background,
  borderBottom: `solid 1px ${theme.color.token.banner.border}`,
});
