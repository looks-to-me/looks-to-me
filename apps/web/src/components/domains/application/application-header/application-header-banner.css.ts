import { recipe } from '@vanilla-extract/recipes';

import { theme } from '../../../../themes';

export const wrapper = recipe({
  base: {
    display: 'flex',
    justifyContent:'center',
    padding: '8px',
    color: theme.color.token.semantic.text,
    fontWeight: 600,
  },
  variants: {
    variant: {
      warning: {
        backgroundColor: theme.color.token.headerBanner.warning.background,
        borderBottom: `solid 1px ${theme.color.token.headerBanner.warning.border}`,
      },
    },
  },

});
