import { style } from '@vanilla-extract/css';

import { theme } from '../../../../../_theme';

export const wrapper = style({
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
  paddingBottom: '16px',
  marginBottom: '32px',
  borderBottom: `solid 1px ${theme.color.token.semantic.border}`,
});

export const avatar = style({
  fontSize: '2rem',
});

export const title = style({
  margin: 0,
});

export const toolbar = style({
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'flex-end',
});
