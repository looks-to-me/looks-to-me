import { style } from '@vanilla-extract/css';

export const wrapper = style({
  padding: '1rem',
  maxWidth: '600px',
  margin: '0 auto',
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

export const submitButton = style({
  // 右寄せ
  marginLeft: 'auto',
  marginRight: '0',
});
