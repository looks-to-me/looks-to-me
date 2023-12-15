import { style } from '@vanilla-extract/css';

import { theme } from '../../../../../../../themes';

export const wrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

export const image = style({
  fontSize: '4rem',
});

export const main = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '.6rem',
});

export const header = style({
  display: 'flex',
  flexDirection: 'column',
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

export const lower = style({
  display: 'flex',
  alignItems: 'center',
  gap: '.5rem',
});

export const numberOfPosts = style({
  fontSize: theme.size.font.tiny,
});
