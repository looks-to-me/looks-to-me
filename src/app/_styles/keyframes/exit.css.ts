import { fallbackVar, keyframes } from '@vanilla-extract/css';

import { exitOpacity } from '../vars/opacity.css';
import { exitTranslateX, exitTranslateY } from '../vars/translate.css';

export const exit = keyframes({
  to: {
    opacity: fallbackVar(exitOpacity, '1'),
    transform: `translate(${fallbackVar(exitTranslateX, '0')}, ${fallbackVar(exitTranslateY, '0')})`,
  },
});
