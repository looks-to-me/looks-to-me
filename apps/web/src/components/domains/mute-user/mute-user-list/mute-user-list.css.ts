import { style } from '@vanilla-extract/css';

import { theme } from '../../../../themes';

export const mutedWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  border: `solid 1px ${theme.color.token.semantic.border}`,
  borderRadius: theme.size.radius.medium,
});

export const notMutedWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100px',
  width: '100%',
  fontWeight: '600',
  fontSize: theme.size.font.large,
});
