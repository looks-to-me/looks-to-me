import { style, globalStyle } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import { theme } from './_theme';

export const body = style({
  color: theme.color.tokens.text,
  backgroundColor: theme.color.tokens.background,
  fontSize: theme.font.size.normal,
  fontWeight: theme.font.weight.normal,
});

globalStyle('h1', {
  fontSize: calc.add(theme.font.size.normal, '1.125rem'),
  fontWeight: theme.font.weight.semiBold,
});

globalStyle('h2', {
  fontSize: calc.add(theme.font.size.normal, '.625rem'),
  fontWeight: theme.font.weight.semiBold,
});

globalStyle('h3', {
  fontSize: calc.add(theme.font.size.normal, '.375rem'),
  fontWeight: theme.font.weight.semiBold,
});

globalStyle('h4', {
  fontSize: calc.add(theme.font.size.normal, '.125rem'),
  fontWeight: theme.font.weight.semiBold,
});

globalStyle('h5', {
  fontSize: theme.font.size.normal,
  fontWeight: theme.font.weight.semiBold,
});

globalStyle('h6', {
  fontSize: calc.subtract(theme.font.size.normal, '.125rem'),
  fontWeight: theme.font.weight.semiBold,
});
