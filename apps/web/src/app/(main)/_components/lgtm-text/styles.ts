import type { CSSProperties } from 'react';

//NOTE: Since satori, a library for converting dom to svg, is used inside ImageResponse, and satori only supports styling with the style property, Vanilla-extract is not used.

export const wrapper: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  fontSize: '10px',
};

const text: CSSProperties = {
  display: 'flex',
  color: '#fff',
  textShadow: `1px 1px 0px #000, -1px -1px 0px #000,
    -1px 1px 0px #000,  1px -1px 0px #000,
    1px 0px 0px #000, -1px  0px 0px #000,
    0px 1px 0px #000,  0px -1px 0px #000`,
};

export const title: CSSProperties = {
  ...text,
  fontSize: '12em',
  fontWeight: 700,
  letterSpacing: '.1em',
};

export const description: CSSProperties = {
  ...text,
  fontSize: '3em',
  letterSpacing: '.05em',
};
