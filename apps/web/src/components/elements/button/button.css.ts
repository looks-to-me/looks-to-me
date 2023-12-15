import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { theme } from '../../../themes';

export const wrapper = recipe({
  base: {
    display: 'inline-flex',
    gap: '8px',
    alignItems: 'center',
    cursor: 'pointer',
    border: 'solid 1px',
    borderRadius: theme.size.radius.medium,
    transitionDuration: theme.duration.normal,
    transitionProperty: 'color, background-color, border-color',
    selectors: {
      '&:disabled': {
        cursor: 'not-allowed',
      },
    },
  },
  variants: {
    variant: {
      normal: {
        color: theme.color.token.button.normal.text,
        borderColor: theme.color.token.button.normal.border,
        backgroundColor: theme.color.token.button.normal.background,
        selectors: {
          '&:hover': {
            color: theme.color.token.button.normal.hover.text,
            borderColor: theme.color.token.button.normal.hover.border,
            backgroundColor: theme.color.token.button.normal.hover.background,
          },
          '&:disabled': {
            color: theme.color.token.button.normal.disabled.text,
            borderColor: theme.color.token.button.normal.disabled.border,
            backgroundColor: theme.color.token.button.normal.disabled.background,
          },
        },
      },
      primary: {
        color: theme.color.token.button.primary.text,
        borderColor: theme.color.token.button.primary.border,
        backgroundColor: theme.color.token.button.primary.background,
        selectors: {
          '&:hover': {
            color: theme.color.token.button.primary.hover.text,
            borderColor: theme.color.token.button.primary.hover.border,
            backgroundColor: theme.color.token.button.primary.hover.background,
          },
          '&:disabled': {
            color: theme.color.token.button.primary.disabled.text,
            borderColor: theme.color.token.button.primary.disabled.border,
            backgroundColor: theme.color.token.button.primary.disabled.background,
          },
        },
      },
      danger: {
        color: theme.color.token.button.danger.text,
        borderColor: theme.color.token.button.danger.border,
        backgroundColor: theme.color.token.button.danger.background,
        selectors: {
          '&:hover': {
            color: theme.color.token.button.danger.hover.text,
            borderColor: theme.color.token.button.danger.hover.border,
            backgroundColor: theme.color.token.button.danger.hover.background,
          },
          '&:disabled': {
            color: theme.color.token.button.danger.disabled.text,
            borderColor: theme.color.token.button.danger.disabled.border,
            backgroundColor: theme.color.token.button.danger.disabled.background,
          },
        },
      },
      ghost: {
        color: theme.color.token.button.ghost.text,
        borderColor: theme.color.token.button.ghost.border,
        backgroundColor: theme.color.token.button.ghost.background,
        selectors: {
          '&:hover': {
            color: theme.color.token.button.ghost.hover.text,
            borderColor: theme.color.token.button.ghost.hover.border,
            backgroundColor: theme.color.token.button.ghost.hover.background,
          },
          '&:disabled': {
            color: theme.color.token.button.ghost.disabled.text,
            borderColor: theme.color.token.button.ghost.disabled.border,
            backgroundColor: theme.color.token.button.ghost.disabled.background,
          },
        },
      },
    },
    borderless: {
      true: {
        borderColor: 'transparent',
        selectors: {
          '&:hover': {
            borderColor: 'transparent',
          },
          '&:disabled': {
            borderColor: 'transparent',
          },
        },
      },
    },
    size: {
      icon: {
        padding: '7px',
      },
      tiny: {
        padding: '3px 8px',
      },
      normal: {
        padding: '5px 8px',
      },
      medium: {
        padding: '7px 8px',
      },
      large: {
        padding: '9px 8px',
      },
    },
  },
});

export const icon = style({
  selectors: {
    [`${wrapper({ variant: 'normal' }).split(' ')[1]} &`]: {
      color: theme.color.token.button.normal.icon,
    },
    [`${wrapper({ variant: 'normal' }).split(' ')[1]}:hover &`]: {
      color: theme.color.token.button.normal.hover.icon,
    },
    [`${wrapper({ variant: 'normal' }).split(' ')[1]}:disabled &`]: {
      color: theme.color.token.button.normal.disabled.icon,
    },
    [`${wrapper({ variant: 'primary' }).split(' ')[1]} &`]: {
      color: theme.color.token.button.primary.icon,
    },
    [`${wrapper({ variant: 'primary' }).split(' ')[1]}:hover &`]: {
      color: theme.color.token.button.primary.hover.icon,
    },
    [`${wrapper({ variant: 'primary' }).split(' ')[1]}:disabled &`]: {
      color: theme.color.token.button.primary.disabled.icon,
    },
    [`${wrapper({ variant: 'danger' }).split(' ')[1]} &`]: {
      color: theme.color.token.button.danger.icon,
    },
    [`${wrapper({ variant: 'danger' }).split(' ')[1]}:hover &`]: {
      color: theme.color.token.button.danger.hover.icon,
    },
    [`${wrapper({ variant: 'danger' }).split(' ')[1]}:disabled &`]: {
      color: theme.color.token.button.danger.disabled.icon,
    },
    [`${wrapper({ variant: 'ghost' }).split(' ')[1]} &`]: {
      color: theme.color.token.button.ghost.icon,
    },
    [`${wrapper({ variant: 'ghost' }).split(' ')[1]}:hover &`]: {
      color: theme.color.token.button.ghost.hover.icon,
    },
    [`${wrapper({ variant: 'ghost' }).split(' ')[1]}:disabled &`]: {
      color: theme.color.token.button.ghost.disabled.icon,
    },
  },
});
