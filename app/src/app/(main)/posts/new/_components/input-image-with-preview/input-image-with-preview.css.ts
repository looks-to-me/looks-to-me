import { style } from '@vanilla-extract/css';

export const wrapper = style({
});

export const dropZone = style({
  border: 'solid 1px white',
  padding: '20px',
  textAlign: 'center',
  height: '200px',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s, border-color 0.3s',
});
