import {
  animateIn,
  animateOut,
  fadeIn,
  fadeOut,
  mergeStyles,
  slideInFromBottom,
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
  slideOutToBottom,
  slideOutToLeft,
  slideOutToRight,
  slideOutToTop,
} from '@praha/vanilla-essence';
import { style } from '@vanilla-extract/css';

import { theme } from '../../../theme';

export const content = style([
  animateIn(),
  fadeIn(),
  {
    zIndex: 100,
    padding: '4px 8px',
    fontSize: theme.size.font.tiny,
    color: theme.color.token.tooltip.text,
    fill: theme.color.token.tooltip.background,
    backgroundColor: theme.color.token.tooltip.background,
    borderRadius: theme.size.radius.medium,
    transition: 'color .25s, background-color .25s',
    selectors: {
      '&[data-state="closed"]': mergeStyles(
        animateOut(),
        fadeOut(),
      ),
      '&[data-side="left"]': mergeStyles(
        slideInFromRight('2px'),
        slideOutToRight('2px'),
      ),
      '&[data-side="right"]': mergeStyles(
        slideInFromLeft('2px'),
        slideOutToLeft('2px'),
      ),
      '&[data-side="bottom"]': mergeStyles(
        slideInFromTop('2px'),
        slideOutToTop('2px'),
      ),
      '&[data-side="top"]': mergeStyles(
        slideInFromBottom('2px'),
        slideOutToBottom('2px'),
      ),
    },
  },
]);
