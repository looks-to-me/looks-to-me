import { style } from '@vanilla-extract/css';

export const wrapper = style({
});

export const textForm = style({
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
    borderBottomColor: '#007BFF',
  },

  '::placeholder': {
    color: '#888',
  },
});
