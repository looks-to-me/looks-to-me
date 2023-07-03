import { createGlobalTheme } from '@vanilla-extract/css';

export const theme = createGlobalTheme(':root', {
  color: {
    palette: {
      black: '',
      white: '',
      gray50: '',
      gray100: '',
      gray200: '',
      gray300: '',
      gray400: '',
      gray500: '',
      gray600: '',
      gray700: '',
      gray800: '',
      gray900: '',
    },
    tokens: {
      text: '',
      textMuted: '',
      background: '',
      backgroundInset: '',
    },
  },
});
