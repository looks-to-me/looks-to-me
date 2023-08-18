import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr))',
  gap: '16px',
});
