import { enter } from '../keyframes/enter.css';
import { exit } from '../keyframes/exit.css';
import { enterOpacity, exitOpacity } from '../vars/opacity.css';
import { enterTranslateX, enterTranslateY, exitTranslateX, exitTranslateY } from '../vars/translate.css';

import type { StyleRule } from '@vanilla-extract/css';

export const animateIn = (value = '.25s'): StyleRule => ({
  animationName: `${enter}`,
  animationDuration: value,
  vars: {
    [enterOpacity]: 'initial',
    [enterTranslateX]: 'initial',
    [enterTranslateY]: 'initial',
  },
});

export const animateOut = (value = '.25s'): StyleRule => ({
  animationName: `${exit}`,
  animationDuration: value,
  vars: {
    [exitOpacity]: 'initial',
    [exitTranslateX]: 'initial',
    [exitTranslateY]: 'initial',
  },
});
