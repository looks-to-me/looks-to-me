import { style } from '@vanilla-extract/css';
import deepmerge from 'deepmerge';

import { animateIn, animateOut } from '../../../styles/transitions/animate.css';
import { fadeIn, fadeOut } from '../../../styles/transitions/fade.css';
import { slideInFromLeft, slideInFromTop, slideOutToLeft, slideOutToTop } from '../../../styles/transitions/slide.css';
import { theme } from '../../../themes';

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

export const content = style([
  animateIn(),
  fadeIn(),
  slideInFromLeft('50%'),
  slideInFromTop('42%'),
  {
    zIndex: 100,
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '12px',
    backgroundColor: theme.color.token.semantic.background,
    borderRadius: theme.size.radius.large,
    border: `1px solid ${theme.color.token.semantic.border}`,
    boxShadow: `${theme.size.shadow.medium} ${theme.color.token.semantic.shadow}`,
    selectors: {
      '&[data-state="closed"]': deepmerge.all<StyleRule>([
        animateOut(),
        fadeOut(),
        slideOutToLeft('50%'),
        slideOutToTop('42%'),
      ]),
    },
  },
]);

export const title = style({
  margin: 0,
  fontSize: theme.size.font.large,
});

export const description = style({
  margin: 0,
  color: theme.color.token.semantic.textMuted,
});

export const footer = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px',
});
