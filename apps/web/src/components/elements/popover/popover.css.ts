import { theme } from '@looks-to-me/package-ui-theme';
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

export const content = style([
  animateIn(),
  fadeIn(),
  {
    zIndex: 100,
    padding: '8px',
    color: theme.color.token.popover.text,
    backgroundColor: theme.color.token.popover.background,
    borderRadius: theme.size.radius.large,
    border: `1px solid ${theme.color.token.popover.border}`,
    boxShadow: `${theme.size.shadow.normal} ${theme.color.token.semantic.shadow}`,
    selectors: {
      '&[data-state="closed"]': mergeStyles(
        animateOut(),
        fadeOut(),
      ),
      '&[data-side="left"]': mergeStyles(
        slideInFromRight('4px'),
        slideOutToRight('4px'),
      ),
      '&[data-side="right"]': mergeStyles(
        slideInFromLeft('4px'),
        slideOutToLeft('4px'),
      ),
      '&[data-side="bottom"]': mergeStyles(
        slideInFromTop('4px'),
        slideOutToTop('4px'),
      ),
      '&[data-side="top"]': mergeStyles(
        slideInFromBottom('4px'),
        slideOutToBottom('4px'),
      ),
    },
  },
]);
