import { theme } from '@looks-to-me/package-ui-theme';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  margin: 0,
  border: `solid 1px ${theme.color.token.semantic.border}`,
  borderRadius: theme.size.radius.medium,
});

export const empty = style([
  wrapper,
  {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '24px',
    fontWeight: '600',
    fontSize: theme.size.font.medium,
  },
]);
