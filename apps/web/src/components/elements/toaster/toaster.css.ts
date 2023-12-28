import { style } from '@vanilla-extract/css';

import { theme } from '../../../themes';

export const toast = style({
  selectors: {
    '&[data-sonner-toast][data-styled=true]': {
      color: theme.color.token.toast.normal.title,
      border: `solid 1px ${theme.color.token.toast.normal.border}`,
      backgroundColor: theme.color.token.toast.normal.background,
      boxShadow: `${theme.size.shadow.normal} ${theme.color.token.semantic.shadow}`,
    },
    '&[data-sonner-toast][data-styled=true][data-type=success]': {
      color: theme.color.token.toast.success.title,
      border: `solid 1px ${theme.color.token.toast.success.border}`,
      backgroundColor: theme.color.token.toast.success.background,
    },
    '&[data-sonner-toast][data-styled=true][data-type=error]': {
      color: theme.color.token.toast.error.title,
      border: `solid 1px ${theme.color.token.toast.error.border}`,
      backgroundColor: theme.color.token.toast.error.background,
    },
  },
});

export const description = style({
  selectors: {
    [`${toast} &[data-description]`]: {
      color: theme.color.token.toast.normal.description,
    },
    [`${toast}[data-type=success] &[data-description]`]: {
      color: theme.color.token.toast.success.description,
    },
    [`${toast}[data-type=error] &[data-description]`]: {
      color: theme.color.token.toast.error.description,
    },
  },
});
