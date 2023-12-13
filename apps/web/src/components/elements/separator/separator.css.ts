import { recipe } from '@vanilla-extract/recipes';

import { theme } from '../../../app/_theme';

export const wrapper = recipe({
  base: {
    flexShrink: 0,
    backgroundColor: theme.color.token.semantic.border,
  },
  variants: {
    orientation: {
      horizontal: {
        width: '100%',
        height: '1px',
      },
      vertical: {
        width: '1px',
        height: '100%',
      },
    },
  },
});
