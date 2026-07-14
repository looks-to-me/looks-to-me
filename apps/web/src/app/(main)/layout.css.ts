import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  width: '100dvw',
  height: '100dvh',
});

export const main = style({
  padding: '16px',
  overflow: 'auto',
});
