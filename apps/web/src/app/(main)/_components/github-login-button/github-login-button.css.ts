import { style } from '@vanilla-extract/css';

import { theme } from '../../../../themes';

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
  padding: '10px 12px',
  fontSize: '1rem',
  fontWeight: 'medium',
  border: `solid 1px ${theme.color.token.semantic.border}`,
  borderRadius: theme.size.radius.medium,
  transitionDuration: theme.duration.normal,
  transitionProperty: 'background-color',
  selectors: {
    '&:hover': {
      backgroundColor: '#4a4f5a',
    },
  },
});
