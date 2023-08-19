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
  border: 'solid 1px',
  borderRadius: theme.size.radius.medium,
  transitionDuration: theme.duration.normal,
  transitionProperty: 'color, background-color, border-color',
  padding: '7px 8px',
});
