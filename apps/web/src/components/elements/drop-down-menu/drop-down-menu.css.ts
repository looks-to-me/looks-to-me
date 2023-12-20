import { style } from '@vanilla-extract/css';
import deepmerge from 'deepmerge';

import { animateIn, animateOut } from '../../../styles/transitions/animate.css';
import { fadeIn, fadeOut } from '../../../styles/transitions/fade.css';
import {
  slideInFromBottom,
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
  slideOutToBottom,
  slideOutToLeft,
  slideOutToRight,
  slideOutToTop,
} from '../../../styles/transitions/slide.css';
import { theme } from '../../../themes';

import type { StyleRule } from '@vanilla-extract/css';

export const content = style([
  animateIn(),
  fadeIn(),
  {
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '4px 0',
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

export const group = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export const icon = style({
  color: theme.color.palette.gray300,
  fontSize: theme.size.font.medium,
});

export const item = style({
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  padding: '7px 8px',
  margin: '0 4px',
  gap: '8px',
  borderRadius: theme.size.radius.medium,
  outline: 'none',
  transitionDuration: theme.duration.normal,
  transitionProperty: 'background-color',
  color: theme.color.token.semantic.text,
  selectors: {
    '&:focus': {
      backgroundColor: theme.color.token.semantic.overlay,
    },
    '&[data-disabled]': {
      opacity: 0.5,
      pointerEvents: 'none',
    },
  },
});

export const label = style({
  padding: '4px 12px',
  fontWeight: 600,
});
