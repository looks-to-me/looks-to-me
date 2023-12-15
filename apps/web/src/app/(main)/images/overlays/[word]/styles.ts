import type { CSSProperties } from 'react';

//NOTE: Since satori, a library for converting dom to svg, is used inside ImageResponse, and satori only supports styling with the style property, Vanilla-extract is not used.

export const overlayTextWrapper: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
};

const overlayTextStyle: CSSProperties = {
  display: 'flex',
  color: '#fff',
  textShadow: `1px 1px 0px #000, -1px -1px 0px #000,
    -1px 1px 0px #000,  1px -1px 0px #000,
    1px 0px 0px #000, -1px  0px 0px #000,
    0px 1px 0px #000,  0px -1px 0px #000`,
};

export const overlayTitleStyle: CSSProperties = {
  ...overlayTextStyle,
  fontSize: 120,
  fontWeight: 700,
  letterSpacing: '.1em',
};

export const overlayDescptionStyle: CSSProperties = {
  ...overlayTextStyle,
  fontSize: 30,
  letterSpacing: '.05em',
};
