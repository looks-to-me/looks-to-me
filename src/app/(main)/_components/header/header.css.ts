import { style } from '@vanilla-extract/css';

import { theme } from '../../../_theme';

export const wrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px',
  padding: '16px',
  borderBottom: `solid 1px ${theme.color.token.semantic.border}`,
  backgroundColor: theme.color.token.semantic.backgroundInset,
});

export const container = style({
  flexGrow: 1,
});

export const link = style({
  fontSize: '1rem',
  textDecoration: 'none',
  color: theme.color.token.semantic.text,
});

export const userAvatar = style({
  borderRadius: '50%',
  cursor: 'pointer',
});

export const popover = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '8px',
  borderRadius: theme.size.radius.normal,
  backgroundColor: theme.color.token.semantic.background,
  height: '100px',
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
