import { style } from '@vanilla-extract/css';

import { theme } from '../../../../../_theme';

export const wrapper = style({
  overflow: 'hidden',
  borderRadius: theme.size.radius.medium,
});

export const image = style({
  objectFit: 'cover',
});
