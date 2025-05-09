import { theme } from '@looks-to-me/package-ui-theme';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  listStyleType: 'none',
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '4px',
  margin: 0,
  padding: 0,
});

export const item = style({
  margin: 0,
  selectors: {
    '&:not(:last-child)::after': {
      content: '/',
      paddingLeft: '4px',
      color: theme.color.token.semantic.textMuted,
    },
  },
});

export const title = style({
  fontWeight: 600,
});
