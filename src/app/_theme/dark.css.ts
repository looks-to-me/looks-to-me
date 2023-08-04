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

        [theme.color.palette.red50]: '#ffdcd7',
        [theme.color.palette.red100]: '#ffc1ba',
        [theme.color.palette.red200]: '#ffa198',
        [theme.color.palette.red300]: '#ff7b72',
        [theme.color.palette.red400]: '#f85149',
        [theme.color.palette.red500]: '#da3633',
        [theme.color.palette.red600]: '#b62324',
        [theme.color.palette.red700]: '#8e1519',
        [theme.color.palette.red800]: '#67060c',
        [theme.color.palette.red900]: '#490202',

        [theme.color.palette.green50]: '#aff5b4',
        [theme.color.palette.green100]: '#7ee787',
        [theme.color.palette.green200]: '#56d364',
        [theme.color.palette.green300]: '#3fb950',
        [theme.color.palette.green400]: '#2ea043',
        [theme.color.palette.green500]: '#238636',
        [theme.color.palette.green600]: '#196c2e',
        [theme.color.palette.green700]: '#0f5323',
        [theme.color.palette.green800]: '#033a16',
        [theme.color.palette.green900]: '#04260f',

        [theme.color.palette.blue50]: '#cae8ff',
        [theme.color.palette.blue100]: '#a5d6ff',
        [theme.color.palette.blue200]: '#79c0ff',
        [theme.color.palette.blue300]: '#58a6ff',
        [theme.color.palette.blue400]: '#388bfd',
        [theme.color.palette.blue500]: '#1f6feb',
        [theme.color.palette.blue600]: '#1158c7',
        [theme.color.palette.blue700]: '#0d419d',
        [theme.color.palette.blue800]: '#0c2d6b',
        [theme.color.palette.blue900]: '#051d4d',

        [theme.color.token.semantic.text]: theme.color.palette.gray50,
        [theme.color.token.semantic.textMuted]: theme.color.palette.gray300,
        [theme.color.token.semantic.background]: theme.color.palette.gray900,
        [theme.color.token.semantic.backgroundInset]: theme.color.palette.black,
        [theme.color.token.semantic.border]: theme.color.palette.gray600,
        [theme.color.token.semantic.borderMuted]: theme.color.palette.gray700,
        [theme.color.token.semantic.overlay]: `color-mix(in srgb, ${theme.color.palette.gray400} 32%, transparent)`,
        [theme.color.token.semantic.shadow]: `color-mix(in srgb, ${theme.color.palette.gray900} 80%, transparent)`,

        [theme.color.token.button.normal.text]: theme.color.palette.gray100,
        [theme.color.token.button.normal.border]: theme.color.palette.gray600,
        [theme.color.token.button.normal.background]: theme.color.palette.gray700,
        [theme.color.token.button.normal.hover.text]: theme.color.palette.gray100,
        [theme.color.token.button.normal.hover.border]: theme.color.palette.gray300,
        [theme.color.token.button.normal.hover.background]: theme.color.palette.gray600,
        [theme.color.token.button.normal.disabled.text]: theme.color.palette.gray500,
        [theme.color.token.button.normal.disabled.border]: theme.color.palette.gray600,
        [theme.color.token.button.normal.disabled.background]: theme.color.palette.gray700,

        [theme.color.token.button.primary.text]: theme.color.palette.white,
        [theme.color.token.button.primary.border]: theme.color.palette.green400,
        [theme.color.token.button.primary.background]: theme.color.palette.green500,
        [theme.color.token.button.primary.hover.text]: theme.color.palette.white,
        [theme.color.token.button.primary.hover.border]: theme.color.palette.green300,
        [theme.color.token.button.primary.hover.background]: theme.color.palette.green400,
        [theme.color.token.button.primary.disabled.text]: theme.color.palette.gray200,
        [theme.color.token.button.primary.disabled.border]: theme.color.palette.green500,
        [theme.color.token.button.primary.disabled.background]: theme.color.palette.green600,

        [theme.color.token.button.danger.text]: theme.color.palette.red400,
        [theme.color.token.button.danger.border]: theme.color.palette.gray600,
        [theme.color.token.button.danger.background]: theme.color.palette.gray700,
        [theme.color.token.button.danger.hover.text]: theme.color.palette.white,
        [theme.color.token.button.danger.hover.border]: theme.color.palette.red400,
        [theme.color.token.button.danger.hover.background]: theme.color.palette.red500,
        [theme.color.token.button.danger.disabled.text]: theme.color.palette.red600,
        [theme.color.token.button.danger.disabled.border]: theme.color.palette.gray600,
        [theme.color.token.button.danger.disabled.background]: theme.color.palette.gray700,

        [theme.color.token.button.ghost.text]: theme.color.palette.gray100,
        [theme.color.token.button.ghost.border]: theme.color.palette.gray600,
        [theme.color.token.button.ghost.background]: 'transparent',
        [theme.color.token.button.ghost.hover.text]: theme.color.palette.gray100,
        [theme.color.token.button.ghost.hover.border]: theme.color.palette.gray300,
        [theme.color.token.button.ghost.hover.background]: `color-mix(in srgb, ${theme.color.palette.gray300} 12%, transparent)`,
        [theme.color.token.button.ghost.disabled.text]: theme.color.palette.gray500,
        [theme.color.token.button.ghost.disabled.border]: theme.color.palette.gray600,
        [theme.color.token.button.ghost.disabled.background]: 'transparent',

        [theme.color.token.tooltip.text]: theme.color.palette.white,
        [theme.color.token.tooltip.background]: theme.color.palette.gray400,

        [theme.color.token.toast.normal.title]: theme.color.palette.white,
        [theme.color.token.toast.normal.description]: theme.color.palette.gray200,
        [theme.color.token.toast.normal.border]: theme.color.palette.gray600,
        [theme.color.token.toast.normal.background]: theme.color.palette.gray800,

        [theme.color.token.toast.success.title]: theme.color.palette.green300,
        [theme.color.token.toast.success.description]: theme.color.palette.green400,
        [theme.color.token.toast.success.border]: theme.color.palette.green600,
        [theme.color.token.toast.success.background]: theme.color.palette.gray800,

        [theme.color.token.toast.error.title]: theme.color.palette.red400,
        [theme.color.token.toast.error.description]: theme.color.palette.red500,
        [theme.color.token.toast.error.border]: theme.color.palette.red600,
        [theme.color.token.toast.error.background]: theme.color.palette.gray800,
      },
    },
  },
});
