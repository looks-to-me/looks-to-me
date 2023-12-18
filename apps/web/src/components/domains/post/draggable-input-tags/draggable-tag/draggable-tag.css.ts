import { style } from '@vanilla-extract/css';

export const wrapper = style({
  cursor: 'grab',
  ':before': {
    content: '#',
    marginRight: '4px',
  },
  selectors: {
    '&[data-is-word="true"]:before': {
      content: '""',
    },
  },
});

export const deleteButton = style({
  display: 'flex',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  color: 'inherit',
});
