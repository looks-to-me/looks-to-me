import { globalStyle } from '@vanilla-extract/css';

import { theme } from './theme.css';

globalStyle(':root', {
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: {
        [theme.color.palette.black]: '#010409',
        [theme.color.palette.white]: '#ffffff',
        [theme.color.palette.gray50]: '#f0f6fc',
        [theme.color.palette.gray100]: '#c9d1d9',
        [theme.color.palette.gray200]: '#b1bac4',
        [theme.color.palette.gray300]: '#8b949e',
        [theme.color.palette.gray400]: '#6e7681',
        [theme.color.palette.gray500]: '#484f58',
        [theme.color.palette.gray600]: '#30363d',
        [theme.color.palette.gray700]: '#21262d',
        [theme.color.palette.gray800]: '#161b22',
        [theme.color.palette.gray900]: '#0d1117',
        [theme.color.tokens.text]: theme.color.palette.gray50,
        [theme.color.tokens.textMuted]: theme.color.palette.gray400,
        [theme.color.tokens.background]: theme.color.palette.gray900,
        [theme.color.tokens.backgroundInset]: theme.color.palette.black,
        [theme.color.tokens.border]: theme.color.palette.gray600,
        [theme.color.tokens.borderMuted]: theme.color.palette.gray700,
      },
    },
  },
});
