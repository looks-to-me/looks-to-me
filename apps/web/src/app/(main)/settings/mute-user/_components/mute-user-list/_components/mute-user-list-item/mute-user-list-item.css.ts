import { style } from '@vanilla-extract/css';

import { theme } from '../../../../../../../../themes';

export const wrapper = style({
  display: 'flex',
  padding: '16px',
  borderRadius: '10px',
  transitionDuration: theme.duration.normal,
  transitionProperty: 'background-color',
  ':hover': {
    backgroundColor: theme.color.token.semantic.overlay,
  },
});

export const profileWrapper = style({
  display: 'flex',
  flexGrow: 1,
  gap: '8px',
  color: theme.color.token.semantic.text,
});

export const image = style({
  fontSize: '3rem',
});

export const nameWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  gap: '4px',
});

export const accountName = style({
  fontSize: theme.size.font.medium,
  fontWeight: 600,
  lineHeight: 1,
});

export const displayName = style({
  color: theme.color.token.semantic.textMuted,
  fontWeight: 400,
  lineHeight: 1,
});

export const actionButton = style({
  alignSelf: 'center',
  borderRadius: '100px',
  padding: '16px',
});
