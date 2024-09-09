import { style } from '@vanilla-extract/css';

export const wrapper = style({
  position: 'relative',
  display: 'inline-block',
});

export const dummy = style({
  'display': 'inline-block',
  'overflow': 'hidden',
  'minWidth': '1em',
  'padding': '3px 5px',
  'whiteSpace': 'nowrap',
  'fontSize': '1rem',
  'opacity': '0',
  '::before': {
    content: '',
  },
  'selectors': {
    '&:empty::before': {
      content: 'attr(data-placeholder)',
    },
  },
});

export const input = style({
  position: 'absolute',
  top: '0',
  left: '0',
  boxSizing: 'border-box',
  width: '100%',
  fontSize: '1rem',
  padding: '2px 4px',
});
