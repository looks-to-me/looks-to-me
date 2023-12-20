import { globalStyle, style } from '@vanilla-extract/css';

import { theme } from '../../../themes';

import type { GlobalStyleRule } from '@vanilla-extract/css';

export const wrapper = style({});

globalStyle(`${wrapper} .react-calendar-heatmap rect`, {
  rx: '2px',
  ry: '2px',
} as GlobalStyleRule & { rx: string; ry: string });

globalStyle(`${wrapper} .react-calendar-heatmap .color-0`, {
  fill: theme.color.token.semantic.backgroundMuted,
});

globalStyle(`${wrapper} .react-calendar-heatmap .color-1`, {
  fill: theme.color.token.calendarHeatMap.color1,
});

globalStyle(`${wrapper} .react-calendar-heatmap .color-2`, {
  fill: theme.color.token.calendarHeatMap.color2,
});

globalStyle(`${wrapper} .react-calendar-heatmap .color-3`, {
  fill: theme.color.token.calendarHeatMap.color3,
});

globalStyle(`${wrapper} .react-calendar-heatmap .color-4`, {
  fill: theme.color.token.calendarHeatMap.color4,
});

globalStyle(`${wrapper} .react-calendar-heatmap text`, {
  fontSize: theme.size.font.extraTiny,
  fill: theme.color.token.semantic.text,
});

globalStyle(`${wrapper} .react-calendar-heatmap rect:hover`, {
  stroke: theme.color.token.semantic.text,
  strokeWidth: '1px',
});
