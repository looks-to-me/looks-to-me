import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import deepmerge from 'deepmerge';

import { animateIn, animateOut } from '../../_styles/transitions/animate.css';
import { fadeIn, fadeOut } from '../../_styles/transitions/fade.css';
import {
  slideInFromBottom,
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
  slideOutToBottom,
  slideOutToLeft,
  slideOutToRight,
  slideOutToTop,
} from '../../_styles/transitions/slide.css';
import { theme } from '../../_theme';

import type { StyleRule } from '@vanilla-extract/css';

export const overlay = style([
  animateIn(),
  fadeIn(),
  {
    zIndex: 100,
    position: 'fixed',
    inset: 0,
    backgroundColor: theme.color.token.semantic.overlay,
    selectors: {
      '&[data-state="closed"]': deepmerge.all<StyleRule>([
        animateOut(),
        fadeOut(),
      ]),
    },
  },
]);

export const content = recipe({
  base: [
    animateIn(),
    fadeIn(),
    {
      zIndex: 100,
      position: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      padding: '8px',
      backgroundColor: theme.color.token.semantic.background,
      boxShadow: `0 0 0 1px ${theme.color.token.semantic.border}, 0 16px 32px ${theme.color.token.semantic.shadow}`,
      selectors: {
        '&[data-state="closed"]': deepmerge.all<StyleRule>([
          animateOut(),
          fadeOut(),
        ]),
      },
    },
  ],
  variants: {
    side: {
      top: [
        slideInFromTop(),
        {
          top: 0,
          left: 0,
          right: 0,
          borderRadius: `0 0 ${theme.radius.large} ${theme.radius.large}`,
          selectors: {
            '&[data-state="closed"]': slideOutToTop(),
          },
        },
      ],
      bottom: [
        slideInFromBottom(),
        {
          bottom: 0,
          left: 0,
          right: 0,
          borderRadius: `${theme.radius.large} ${theme.radius.large} 0 0`,
          selectors: {
            '&[data-state="closed"]': slideOutToBottom(),
          },
        },
      ],
      left: [
        slideInFromLeft(),
        {
          left: 0,
          top: 0,
          bottom: 0,
          borderRadius: `0 ${theme.radius.large} ${theme.radius.large} 0`,
          selectors: {
            '&[data-state="closed"]': slideOutToLeft(),
          },
        },
      ],
      right: [
        slideInFromRight(),
        {
          right: 0,
          top: 0,
          bottom: 0,
          borderRadius: `${theme.radius.large} 0 0 ${theme.radius.large}`,
          selectors: {
            '&[data-state="closed"]': slideOutToRight(),
          },
        },
      ],
    },
  },
});

export const close = style({
  position: 'absolute',
  top: '.75rem',
  right: '.75rem',
  fontSize: '1rem',
});

export const title = style({
  margin: 0,
  fontSize: theme.font.size.large,
});

export const description = style({
  margin: 0,
  color: theme.color.token.semantic.textMuted,
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '8px',
});
