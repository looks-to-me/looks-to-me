import { fallbackVar, keyframes } from '@vanilla-extract/css';

import { enterOpacity } from '../vars/opacity.css';
import { enterTranslateX, enterTranslateY } from '../vars/translate.css';

export const enter = keyframes({
  from: {
    opacity: fallbackVar(enterOpacity, '1'),
    transform: `translate(${fallbackVar(enterTranslateX, '0')}, ${fallbackVar(enterTranslateY, '0')})`,
  },
});
