import { style } from '@vanilla-extract/css';

export const main = style({
  maxWidth: '400px',
  width:'100%',
});

export const buttonWrapper = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px',
});
