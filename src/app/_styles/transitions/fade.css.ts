import { enterOpacity, exitOpacity } from '../vars/opacity.css';

import type { StyleRule } from '@vanilla-extract/css';

export const fadeIn = (value = '0%'): StyleRule => ({
  vars: {
    [enterOpacity]: value,
  },
});

export const fadeOut = (value = '0%'): StyleRule => ({
  vars: {
    [exitOpacity]: value,
  },
});
