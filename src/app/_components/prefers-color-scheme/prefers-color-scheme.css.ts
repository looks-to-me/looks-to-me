import { style } from '@vanilla-extract/css';

export const light = style({
  '@media': {
    '(prefers-color-scheme: dark)': {
      display: 'none !important',
    },
  },
});

export const dark = style({
  '@media': {
    '(prefers-color-scheme: light)': {
      display: 'none !important',
    },
  },
});
