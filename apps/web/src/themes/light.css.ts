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

        [theme.color.palette.red50]: '#ffebe9',
        [theme.color.palette.red100]: '#ffcecb',
        [theme.color.palette.red200]: '#ffaba8',
        [theme.color.palette.red300]: '#ff8182',
        [theme.color.palette.red400]: '#fa4549',
        [theme.color.palette.red500]: '#cf222e',
        [theme.color.palette.red600]: '#a40e26',
        [theme.color.palette.red700]: '#82071e',
        [theme.color.palette.red800]: '#660018',
        [theme.color.palette.red900]: '#4c0014',

        [theme.color.palette.green50]: '#dafbe1',
        [theme.color.palette.green100]: '#aceebb',
        [theme.color.palette.green200]: '#6fdd8b',
        [theme.color.palette.green300]: '#4ac26b',
        [theme.color.palette.green400]: '#2da44e',
        [theme.color.palette.green500]: '#1a7f37',
        [theme.color.palette.green600]: '#116329',
        [theme.color.palette.green700]: '#044f1e',
        [theme.color.palette.green800]: '#003d16',
        [theme.color.palette.green900]: '#002d11',

        [theme.color.palette.blue50]: '#ddf4ff',
        [theme.color.palette.blue100]: '#b6e3ff',
        [theme.color.palette.blue200]: '#80ccff',
        [theme.color.palette.blue300]: '#54aeff',
        [theme.color.palette.blue400]: '#218bff',
        [theme.color.palette.blue500]: '#0969da',
        [theme.color.palette.blue600]: '#0550ae',
        [theme.color.palette.blue700]: '#033d8b',
        [theme.color.palette.blue800]: '#0a3069',
        [theme.color.palette.blue900]: '#002155',

        [theme.color.palette.yellow50]: '#fff8c5',
        [theme.color.palette.yellow100]: '#fae17d',
        [theme.color.palette.yellow200]: '#eac54f',
        [theme.color.palette.yellow300]: '#d4a72c',
        [theme.color.palette.yellow400]: '#bf8700',
        [theme.color.palette.yellow500]: '#9a6700',
        [theme.color.palette.yellow600]: '#7d4e00',
        [theme.color.palette.yellow700]: '#633c01',
        [theme.color.palette.yellow800]: '#4d2d00',
        [theme.color.palette.yellow900]: '#3b2300',

        [theme.color.token.semantic.text]: theme.color.palette.black,
        [theme.color.token.semantic.textMuted]: theme.color.palette.gray600,
        [theme.color.token.semantic.background]: theme.color.palette.white,
        [theme.color.token.semantic.backgroundMuted]: theme.color.palette.gray200,
        [theme.color.token.semantic.backgroundInset]: theme.color.palette.gray50,
        [theme.color.token.semantic.border]: theme.color.palette.gray200,
        [theme.color.token.semantic.borderMuted]: theme.color.palette.gray100,
        [theme.color.token.semantic.overlay]: `color-mix(in srgb, ${theme.color.palette.gray100} 48%, transparent)`,
        [theme.color.token.semantic.shadow]: `color-mix(in srgb, ${theme.color.palette.gray700} 16%, transparent)`,

        [theme.color.token.button.normal.text]: theme.color.palette.gray900,
        [theme.color.token.button.normal.icon]: theme.color.palette.gray500,
        [theme.color.token.button.normal.border]: theme.color.palette.gray200,
        [theme.color.token.button.normal.background]: theme.color.palette.gray50,
        [theme.color.token.button.normal.hover.text]: theme.color.palette.gray900,
        [theme.color.token.button.normal.hover.icon]: theme.color.palette.gray500,
        [theme.color.token.button.normal.hover.border]: theme.color.palette.gray300,
        [theme.color.token.button.normal.hover.background]: theme.color.palette.gray100,
        [theme.color.token.button.normal.disabled.text]: theme.color.palette.gray400,
        [theme.color.token.button.normal.disabled.icon]: theme.color.palette.gray300,
        [theme.color.token.button.normal.disabled.border]: theme.color.palette.gray200,
        [theme.color.token.button.normal.disabled.background]: theme.color.palette.gray50,

        [theme.color.token.button.primary.text]: theme.color.palette.white,
        [theme.color.token.button.primary.icon]: theme.color.palette.white,
        [theme.color.token.button.primary.border]: theme.color.palette.green600,
        [theme.color.token.button.primary.background]: theme.color.palette.green500,
        [theme.color.token.button.primary.hover.text]: theme.color.palette.white,
        [theme.color.token.button.primary.hover.icon]: theme.color.palette.white,
        [theme.color.token.button.primary.hover.border]: theme.color.palette.green700,
        [theme.color.token.button.primary.hover.background]: theme.color.palette.green600,
        [theme.color.token.button.primary.disabled.text]: theme.color.palette.gray50,
        [theme.color.token.button.primary.disabled.icon]: theme.color.palette.gray50,
        [theme.color.token.button.primary.disabled.border]: theme.color.palette.green400,
        [theme.color.token.button.primary.disabled.background]: theme.color.palette.green200,

        [theme.color.token.button.danger.text]: theme.color.palette.red500,
        [theme.color.token.button.danger.icon]: theme.color.palette.red500,
        [theme.color.token.button.danger.border]: theme.color.palette.gray200,
        [theme.color.token.button.danger.background]: theme.color.palette.gray50,
        [theme.color.token.button.danger.hover.text]: theme.color.palette.white,
        [theme.color.token.button.danger.hover.icon]: theme.color.palette.white,
        [theme.color.token.button.danger.hover.border]: theme.color.palette.red700,
        [theme.color.token.button.danger.hover.background]: theme.color.palette.red600,
        [theme.color.token.button.danger.disabled.text]: theme.color.palette.red200,
        [theme.color.token.button.danger.disabled.icon]: theme.color.palette.red200,
        [theme.color.token.button.danger.disabled.border]: theme.color.palette.gray200,
        [theme.color.token.button.danger.disabled.background]: theme.color.palette.gray50,

        [theme.color.token.button.ghost.text]: theme.color.palette.gray900,
        [theme.color.token.button.ghost.icon]: theme.color.palette.gray500,
        [theme.color.token.button.ghost.border]: theme.color.palette.gray200,
        [theme.color.token.button.ghost.background]: 'transparent',
        [theme.color.token.button.ghost.hover.text]: theme.color.palette.gray900,
        [theme.color.token.button.ghost.hover.icon]: theme.color.palette.gray500,
        [theme.color.token.button.ghost.hover.border]: theme.color.palette.gray300,
        [theme.color.token.button.ghost.hover.background]: `color-mix(in srgb, ${theme.color.palette.gray200} 32%, transparent)`,
        [theme.color.token.button.ghost.disabled.text]: theme.color.palette.gray400,
        [theme.color.token.button.ghost.disabled.icon]: theme.color.palette.gray300,
        [theme.color.token.button.ghost.disabled.border]: theme.color.palette.gray200,
        [theme.color.token.button.ghost.disabled.background]: 'transparent',

        [theme.color.token.popover.text]: theme.color.palette.black,
        [theme.color.token.popover.border]: theme.color.palette.gray200,
        [theme.color.token.popover.background]: theme.color.palette.white,

        [theme.color.token.toast.normal.title]: theme.color.palette.gray900,
        [theme.color.token.toast.normal.description]: theme.color.palette.gray800,
        [theme.color.token.toast.normal.border]: theme.color.palette.gray200,
        [theme.color.token.toast.normal.background]: theme.color.palette.gray50,

        [theme.color.token.toast.success.title]: theme.color.palette.green500,
        [theme.color.token.toast.success.description]: theme.color.palette.green600,
        [theme.color.token.toast.success.border]: theme.color.palette.green400,
        [theme.color.token.toast.success.background]: theme.color.palette.gray50,

        [theme.color.token.toast.error.title]: theme.color.palette.red500,
        [theme.color.token.toast.error.description]: theme.color.palette.red600,
        [theme.color.token.toast.error.border]: theme.color.palette.red400,
        [theme.color.token.toast.error.background]: theme.color.palette.gray50,

        [theme.color.token.tooltip.text]: theme.color.palette.white,
        [theme.color.token.tooltip.background]: theme.color.palette.gray900,

        [theme.color.token.headerBanner.warning.background]: theme.color.palette.yellow50,
        [theme.color.token.headerBanner.warning.border]: theme.color.palette.yellow200,
      },
    },
  },
});
