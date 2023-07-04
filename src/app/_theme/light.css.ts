import { globalStyle } from '@vanilla-extract/css';

import { theme } from './theme.css';

globalStyle(':root', {
  '@media': {
    '(prefers-color-scheme: light)': {
      vars: {
        [theme.color.palette.black]: '#1f2328',
        [theme.color.palette.white]: '#ffffff',
        [theme.color.palette.gray50]: '#f6f8fa',
        [theme.color.palette.gray100]: '#eaeef2',
        [theme.color.palette.gray200]: '#d0d7de',
        [theme.color.palette.gray300]: '#afb8c1',
        [theme.color.palette.gray400]: '#8c959f',
        [theme.color.palette.gray500]: '#6e7781',
        [theme.color.palette.gray600]: '#57606a',
        [theme.color.palette.gray700]: '#424a53',
        [theme.color.palette.gray800]: '#32383f',
        [theme.color.palette.gray900]: '#24292f',
        [theme.color.tokens.text]: theme.color.palette.black,
        [theme.color.tokens.textMuted]: theme.color.palette.gray500,
        [theme.color.tokens.background]: theme.color.palette.white,
        [theme.color.tokens.backgroundInset]: theme.color.palette.gray50,
        [theme.color.tokens.border]: theme.color.palette.gray200,
        [theme.color.tokens.borderMuted]: theme.color.palette.gray100,
      },
    },
  },
});
