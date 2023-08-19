import { style } from '@vanilla-extract/css';

import { theme } from '../../../_theme';

export const icon = style({
  fontSize: theme.size.font.medium,
});

export const button = style({
  color: '#fff',
  backgroundColor: '#24292f',
});
