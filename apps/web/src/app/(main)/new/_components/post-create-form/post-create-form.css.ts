import { style } from '@vanilla-extract/css';

import { theme } from '../../../../_theme';

export const wrapper = style({
  padding: '1rem',
  maxWidth: '600px',
  margin: '0 auto',
});

export const footer = style({
  display: 'flex',
  marginTop: '1rem',
});

export const word = style({
  appearance: 'none',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid #ccc',
  fontSize: '1rem',
  color: 'inherit',
  padding: '2px 4px',
  outline: 'none',
  transition: 'border-color 0.3s',
  ':focus': {
    borderBottomColor: theme.color.palette.blue500,
  },
  '::placeholder': {
    color: theme.color.palette.gray500,
  },
});

export const submit = style({
  marginLeft: 'auto',
  marginRight: '0',
});
