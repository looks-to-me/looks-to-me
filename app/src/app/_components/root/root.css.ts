import { globalStyle } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import { theme } from '../../_theme';

globalStyle('body', {
  color: theme.color.token.semantic.text,
  backgroundColor: theme.color.token.semantic.background,
  fontSize: theme.size.font.normal,
  fontWeight: 400,
});

globalStyle('h1', {
  fontSize: calc.add(theme.size.font.normal, '1.125rem'),
  fontWeight: 600,
});

globalStyle('h2', {
  fontSize: calc.add(theme.size.font.normal, '.625rem'),
  fontWeight: 600,
});

globalStyle('h3', {
  fontSize: calc.add(theme.size.font.normal, '.375rem'),
  fontWeight: 600,
});

globalStyle('h4', {
  fontSize: calc.add(theme.size.font.normal, '.125rem'),
  fontWeight: 600,
});

globalStyle('h5', {
  fontSize: theme.size.font.normal,
  fontWeight: 600,
});

globalStyle('h6', {
  fontSize: calc.subtract(theme.size.font.normal, '.125rem'),
  fontWeight: 600,
});

globalStyle('a', {
  textDecoration: 'none',
  color: theme.color.palette.blue500,
});

globalStyle('li', {
  margin: '8px 0',
  lineHeight: 1.5,
});

globalStyle('p', {
  margin: 0,
  lineHeight: 1.5,
});
