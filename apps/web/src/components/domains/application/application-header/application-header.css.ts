import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { theme } from '../../../../theme';

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px',
  padding: '16px',
  borderBottom: `solid 1px ${theme.color.token.semantic.border}`,
  backgroundColor: theme.color.token.semantic.backgroundInset,
});

export const section = recipe({
  base: {
    display: 'flex',
    flexGrow: 1,
    gap: '16px',
    alignItems: 'center',
  },
  variants: {
    align: {
      start: {
        justifyContent: 'flex-start',
      },
      end: {
        justifyContent: 'flex-end',
      },
    },
  },
});
