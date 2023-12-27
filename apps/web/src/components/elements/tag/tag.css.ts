import { recipe } from '@vanilla-extract/recipes';

import { theme } from '../../../themes';

export const wrapper = recipe({
  base:{
    width:'fit-content',
    display: 'flex',
    padding: '4px 12px',
    alignItems: 'center',
    borderRadius: theme.size.radius.pill,
    fontSize: theme.size.font.tiny,
    whiteSpace:'nowrap',
  },
  variants:{
    variant: {
      normal:{
        border: `1px solid ${theme.color.token.tag.normal.border}`,
        color: theme.color.token.tag.normal.text,
        backgroundColor:theme.color.token.tag.normal.background,
      },
      primary: {
        border: `1px solid ${theme.color.token.tag.primary.border}`,
        color: theme.color.token.tag.primary.text,
        backgroundColor:theme.color.token.tag.primary.background,
      },
    },
  },
});
