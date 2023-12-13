import type { StyleRule } from '@vanilla-extract/css';

export const breakpoints = {
  sm: 'screen and (width > 640px)',
  md: 'screen and (width > 768px)',
  lg: 'screen and (width > 1024px)',
} as const;

type BreakpointName = keyof typeof breakpoints;

export const applyResponsive = (breakpointName: BreakpointName) => {
  return (rule: StyleRule) => ({
    '@media': {
      [breakpoints[breakpointName]]: rule,
    },
  });
};
