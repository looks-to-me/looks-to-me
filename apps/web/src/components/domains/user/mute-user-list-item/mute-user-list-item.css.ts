import { style } from '@vanilla-extract/css';

import { theme } from '../../../../themes';

export const wrapper = style({
  display: 'flex',
  padding: ' 16px',
  justifyContent: 'space-between',
  borderBottom: `solid 1px ${theme.color.token.semantic.border}`,
  selectors: {
    '&:last-child': {
      borderBottom: 'none',
    },
  },
});

export const profileWrapper = style({
  display: 'flex',
  gap: '8px',
  color: theme.color.token.semantic.text,
});

export const avatar = style({
  fontSize: '3rem',
});

export const nameWrapper = style({
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

export const unmutedButton = style({
  alignSelf: 'center',
});
