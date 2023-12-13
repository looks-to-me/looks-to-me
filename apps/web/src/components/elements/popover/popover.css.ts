import { style } from '@vanilla-extract/css';
import deepmerge from 'deepmerge';

import { animateIn, animateOut } from '../../../app/_styles/transitions/animate.css';
import { fadeIn, fadeOut } from '../../../app/_styles/transitions/fade.css';
import {
  slideInFromBottom,
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
  slideOutToBottom,
  slideOutToLeft,
  slideOutToRight,
  slideOutToTop,
} from '../../../app/_styles/transitions/slide.css';
import { theme } from '../../../themes';

import type { StyleRule } from '@vanilla-extract/css';

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
      '&[data-state="closed"]': deepmerge.all<StyleRule>([
        animateOut(),
        fadeOut(),
      ]),
      '&[data-side="left"]': deepmerge.all<StyleRule>([
        slideInFromRight('4px'),
        slideOutToRight('4px'),
      ]),
      '&[data-side="right"]': deepmerge.all<StyleRule>([
        slideInFromLeft('4px'),
        slideOutToLeft('4px'),
      ]),
      '&[data-side="bottom"]': deepmerge.all<StyleRule>([
        slideInFromTop('4px'),
        slideOutToTop('4px'),
      ]),
      '&[data-side="top"]': deepmerge.all<StyleRule>([
        slideInFromBottom('4px'),
        slideOutToBottom('4px'),
      ]),
    },
  },
]);
