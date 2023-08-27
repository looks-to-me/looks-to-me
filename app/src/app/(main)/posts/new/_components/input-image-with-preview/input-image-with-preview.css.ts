import { style } from '@vanilla-extract/css';

export const wrapper = style({
  maxWidth: '600px',
});

export const dropZone = style({
  border: 'solid 1px white',
  padding: '20px',
  textAlign: 'center',
  minHeight: '200px',
  maxHeight: '80%',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s, border-color 0.3s',
});

export const image = style({
  maxWidth: '90%',
  maxHeight: '90%',
});
