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

export const overlay = style({
  position: 'absolute',
  margin: 'auto',
  inset: '0px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  containerType: 'inline-size',
});

export const overlayText = style({
  display: 'flex',
  color: '#fff',
  textShadow:
    `1px 1px 0px #000, -1px -1px 0px #000,
    -1px 1px 0px #000,  1px -1px 0px #000,
    1px 0px 0px #000, -1px  0px 0px #000,
    0px 1px 0px #000,  0px -1px 0px #000`,
});

export const overlayTitle = style({
  fontSize: '20cqw',
  fontWeight: 700,
  letterSpacing: '.1em',
});

export const overlaySubTitle = style({
  fontSize: '5cqw',
  letterSpacing: '.05em',
});
