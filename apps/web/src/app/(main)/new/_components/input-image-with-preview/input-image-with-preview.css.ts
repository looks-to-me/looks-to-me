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
  maxWidth: '90%',
  maxHeight: '90%',
});

const INPUT_IMAGE_WIDTH = '630px';
export const overlayTextWrapper = style({
  position: 'absolute',
  top: '0',
  display: 'flex',
  textAlign: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height:'100%',
  '@media': {
    [`screen and (width < ${INPUT_IMAGE_WIDTH})`]: {
      fontSize: '2.2vw',
    },
  },
});
