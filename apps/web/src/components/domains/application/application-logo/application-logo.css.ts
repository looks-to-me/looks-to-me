import { style } from '@vanilla-extract/css';

import { theme } from '../../../../theme';

export const wrapper = style({
  textDecoration: 'none',
});

export const container = style({
  margin: 0,
});

export const icon = style({
  'display': 'flex',
  'transitionDuration': theme.duration.normal,
  'transitionProperty': 'color',
  '@media': {
    '(prefers-color-scheme: light)': {
      color: '#1f2328',
    },
    '(prefers-color-scheme: dark)': {
      color: '#fff',
    },
  },
});
