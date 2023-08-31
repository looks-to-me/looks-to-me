import { style, createVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import { theme } from '../../_theme';

export const size = createVar();

export const wrapper = style({
  position: 'relative',
  display: 'flex',
  width: calc.multiply(theme.size.avatar.base, size),
  height: calc.multiply(theme.size.avatar.base, size),
  flexShrink: 0,
  overflow: 'hidden',
  borderRadius: theme.size.radius.pill,
});

export const image = style({
  aspectRatio: '1/1',
  height: '100%',
  width: '100%',
});

export const fallback = style({
  display: 'flex',
  height: '100%',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.size.radius.pill,
  backgroundColor: theme.color.token.semantic.backgroundMuted,
  color: theme.color.token.semantic.text,
});
