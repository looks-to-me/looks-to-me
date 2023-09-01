import { style } from '@vanilla-extract/css';

import { theme } from '../../../_theme';

export const wrapper = style({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: theme.size.radius.medium,
  border: `solid 1px ${theme.color.token.semantic.border}`,
  selectors: {
    '&:after': {
      content: '',
      position: 'absolute',
      inset: 0,
      opacity: 0,
      transitionProperty: 'opacity',
      transitionDuration: theme.duration.normal,
      backgroundColor: theme.color.token.semantic.overlay,
    },
    '&:hover:after': {
      opacity: 1,
    },
  },
});

export const image = style({
  objectFit: 'cover',
});
