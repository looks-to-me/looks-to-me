import { style } from '@vanilla-extract/css';

import { applyResponsive } from '../../../../_styles/responsive';
import { theme } from '../../../../_theme';

export const wrapper = style({
  maxWidth: '900px',
  margin: '0 auto',
  display: 'flex',
  gap: '24px',
});

export const menu = style({
  display: 'none',
  paddingRight: '24px',
  borderRight: `solid 1px ${theme.color.token.semantic.border}`,
  ...applyResponsive('sm')({
    display: 'flex',
    flexBasis: '270px',
    flexDirection: 'column',
    position: 'relative',
  }),
});

export const menuItem = style({
  padding: '10px',
  '::before': {
    display: 'none',
  },
  ...applyResponsive('sm')({
    selectors: {
      '&[data-is-current-page="true"]': {
        backgroundColor: theme.color.token.semantic.overlay,
      },
      '&[data-is-current-page="true"]:hover': {
        filter: 'brightness(0.9)',
      },
      '&[data-is-current-page="true"]:before': {
        display: 'block',
        content: '',
        borderRadius: '5px',
        height: '1.5em',
        left: '-8px',
        position: 'absolute',
        width: '3px',
        backgroundColor: theme.color.token.semantic.activeSelected,
      },
    },
  }),
});

export const content = style({
  flexGrow: '1',
});
