import { style } from '@vanilla-extract/css';

import { theme } from '../../../../../_theme';

export const wrapper = style({
  display: 'flex',
  position: 'relative',
  overflow: 'hidden',
  border: `solid 1px ${theme.color.token.semantic.border}`,
  borderRadius: theme.size.radius.medium,
});

export const image = style({
  position: 'relative !important' as 'relative',
  maxHeight: '64vh',
  backgroundColor: theme.color.token.semantic.backgroundInset,
});
