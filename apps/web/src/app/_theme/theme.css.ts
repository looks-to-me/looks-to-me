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
      red50: '',
      red100: '',
      red200: '',
      red300: '',
      red400: '',
      red500: '',
      red600: '',
      red700: '',
      red800: '',
      red900: '',
      green50: '',
      green100: '',
      green200: '',
      green300: '',
      green400: '',
      green500: '',
      green600: '',
      green700: '',
      green800: '',
      green900: '',
      blue50: '',
      blue100: '',
      blue200: '',
      blue300: '',
      blue400: '',
      blue500: '',
      blue600: '',
      blue700: '',
      blue800: '',
      blue900: '',
    },
    token: {
      semantic: {
        text: '',
        textMuted: '',
        background: '',
        backgroundMuted: '',
        backgroundInset: '',
        border: '',
        borderMuted: '',
        overlay: '',
        shadow: '',
        activeSelected: '',
      },
      button: {
        normal: {
          text: '',
          icon: '',
          border: '',
          background: '',
          hover: {
            text: '',
            icon: '',
            border: '',
            background: '',
          },
          disabled: {
            text: '',
            icon: '',
            border: '',
            background: '',
          },
        },
        primary: {
          text: '',
          icon: '',
          border: '',
          background: '',
          hover: {
            text: '',
            icon: '',
            border: '',
            background: '',
          },
          disabled: {
            text: '',
            icon: '',
            border: '',
            background: '',
          },
        },
        danger: {
          text: '',
          icon: '',
          border: '',
          background: '',
          hover: {
            text: '',
            icon: '',
            border: '',
            background: '',
          },
          disabled: {
            text: '',
            icon: '',
            border: '',
            background: '',
          },
        },
        ghost: {
          text: '',
          icon: '',
          border: '',
          background: '',
          hover: {
            text: '',
            icon: '',
            border: '',
            background: '',
          },
          disabled: {
            text: '',
            icon: '',
            border: '',
            background: '',
          },
        },
      },
      popover: {
        text: '',
        border: '',
        background: '',
      },
      toast: {
        normal: {
          title: '',
          description: '',
          border: '',
          background: '',
        },
        success: {
          title: '',
          description: '',
          border: '',
          background: '',
        },
        error: {
          title: '',
          description: '',
          border: '',
          background: '',
        },
      },
      tooltip: {
        text: '',
        background: '',
      },
    },
  },
  size: {
    font: {
      tiny: '.75rem',
      normal: '.875rem',
      medium: '1rem',
      large: '1.25rem',
    },
    radius: {
      tiny: '2px',
      normal: '4px',
      medium: '6px',
      large: '8px',
      pill: '9999px',
    },
    shadow: {
      border: '0 0 0 1px',
      tiny: '0 1px 2px 0',
      normal: '0 4px 6px -1px',
      medium: '0 10px 15px -3px',
      large: '0 20px 25px -5px',
    },
    avatar: {
      base: '1.25rem',
    },
  },
  duration: {
    fast: '100ms',
    normal: '250ms',
    slow: '500ms',
  },
  breakpoints: {
    sm: 'screen and (width < 640px)',
    md: 'screen and (640px <= width < 768px)',
    lg: 'screen and (768px <= width)',
  },
});
