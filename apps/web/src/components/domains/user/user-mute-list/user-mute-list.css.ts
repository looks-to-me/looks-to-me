import { style } from '@vanilla-extract/css';

import { theme } from '../../../../theme';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  margin: 0,
  border: `solid 1px ${theme.color.token.semantic.border}`,
  borderRadius: theme.size.radius.medium,
});

export const empty = style({
  justifyContent: 'center',
  alignItems: 'center',
  padding: '24px',
  fontWeight: '600',
  fontSize: theme.size.font.medium,
});

export const item = style({
  display: 'flex',
  padding: ' 16px',
  margin: '0',
  justifyContent: 'space-between',
  borderBottom: `solid 1px ${theme.color.token.semantic.border}`,
  selectors: {
    '&:last-child': {
      borderBottom: 'none',
    },
  },
});

export const profile = style({
  display: 'flex',
  gap: '8px',
  color: theme.color.token.semantic.text,
});

export const avatar = style({
  fontSize: '3rem',
});

export const name = style({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '4px',
});

export const accountName = style({
  fontSize: theme.size.font.medium,
  fontWeight: 600,
});

export const displayName = style({
  color: theme.color.token.semantic.textMuted,
});

export const unmute = style({
  alignSelf: 'center',
});
