import { style } from '@vanilla-extract/css';

import { theme } from '../../../../../_theme';

export const wrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

export const image = style({
  borderRadius: theme.size.radius.pill,
});

export const main = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '.6rem',
});

export const name = style({
  fontSize: theme.size.font.medium,
  fontWeight: 'bold',
  margin: 0,
});

export const lower = style({
  display: 'flex',
  alignItems: 'center',
  gap: '.5rem',
});

export const numOfPosts = style({
  fontSize: theme.size.font.tiny,
  margin: 0,
});
