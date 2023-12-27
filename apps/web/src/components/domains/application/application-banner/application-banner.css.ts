import { style } from '@vanilla-extract/css';

import { theme } from '../../../../themes';

export const wrapper = style({
  display: 'flex',
  justifyContent:'center',
  padding: '8px',
  color: theme.color.token.semantic.text,
  fontWeight: 600,
  backgroundColor: theme.color.token.headerBanner.warning.background,
  borderBottom: `solid 1px ${theme.color.token.headerBanner.warning.border}`,
});
