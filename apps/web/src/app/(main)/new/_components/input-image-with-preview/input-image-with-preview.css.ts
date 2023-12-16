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

export const imageWrapper = style({
  position: 'relative',
});

export const image = style({
  width: '90%',
  maxHeight: '90%',
});

export const overlayImageWord = style({
  position: 'absolute',
  margin: 'auto',
  inset: '0px',
  objectFit: 'contain',
  maxWidth: '90%',
  maxHeight: '100%',
});
