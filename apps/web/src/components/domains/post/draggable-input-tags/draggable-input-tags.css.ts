import { style } from '@vanilla-extract/css';

import { theme } from '../../../../themes';

export const wrapper = style({
  display: 'inline-flex',
  width: '100%',
  padding: '16px',
  overflowX: 'auto',
  gap: '8px',
  border: `solid 1px ${theme.color.token.semantic.border}`,
  borderRadius: theme.size.radius.medium,
});

export const input = style({
  fontSize: theme.size.font.tiny,
  backgroundColor: 'transparent',
  border: 'none',
  width: '100%',
  color: theme.color.token.semantic.text,
  outline: 'none',
});
