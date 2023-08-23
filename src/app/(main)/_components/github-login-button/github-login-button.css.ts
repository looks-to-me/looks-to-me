import { style } from '@vanilla-extract/css';

import { theme } from '../../../_theme';

export const icon = style({
  fontSize: theme.size.font.medium,
});

export const button = style({
  color: '#fff',
  backgroundColor: '#24292f',
  display: 'inline-flex',
  gap: '8px',
  alignItems: 'center',
  cursor: 'pointer',
  border: `solid 1px ${theme.color.token.semantic.border}`,
  borderRadius: theme.size.radius.medium,
  transitionDuration: theme.duration.normal,
  transitionProperty: 'background-color',
  padding: '7px 8px',
  selectors: {
    '&:hover': {
      backgroundColor: '#4a4f5a',
    },
  },
});
