import { enterTranslateX, enterTranslateY, exitTranslateX, exitTranslateY } from '../vars/translate.css';

import type { StyleRule } from '@vanilla-extract/css';

export const slideInFromTop = (value = '100%'): StyleRule => ({
  vars: {
    [enterTranslateY]: `-${value}`,
  },
});

export const slideInFromBottom = (value = '100%'): StyleRule => ({
  vars: {
    [enterTranslateY]: value,
  },
});

export const slideInFromLeft = (value = '100%'): StyleRule => ({
  vars: {
    [enterTranslateX]: `-${value}`,
  },
});

export const slideInFromRight = (value = '100%'): StyleRule => ({
  vars: {
    [enterTranslateX]: value,
  },
});

export const slideOutToTop = (value = '100%'): StyleRule => ({
  vars: {
    [exitTranslateY]: `-${value}`,
  },
});

export const slideOutToBottom = (value = '100%'): StyleRule => ({
  vars: {
    [exitTranslateY]: value,
  },
});

export const slideOutToLeft = (value = '100%'): StyleRule => ({
  vars: {
    [exitTranslateX]: `-${value}`,
  },
});

export const slideOutToRight = (value = '100%'): StyleRule => ({
  vars: {
    [exitTranslateX]: value,
  },
});
