import { style } from '@vanilla-extract/css';

import { theme } from '../../../_theme';

export const avatar = style({
  cursor: 'pointer',
  fontSize: '2rem',
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '8px',
  borderRadius: theme.size.radius.normal,
  backgroundColor: theme.color.token.semantic.background,
  height: '120px',
  width: '200px',
});

export const accountInfoArea = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export const accountName = style({
  margin: 0,
  fontWeight: 'bold',
});

export const displayName = style({
  margin: 0,
  color: theme.color.token.semantic.textMuted,
});

export const buttonArea = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
});
