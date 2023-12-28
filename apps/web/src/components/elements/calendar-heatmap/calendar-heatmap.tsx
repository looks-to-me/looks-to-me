import { clsx } from 'clsx';
import { forwardRef } from 'react';
import ReactCalendarHeatmap from 'react-calendar-heatmap';

import * as styles from './calendar-heatmap.css';

import type { ForwardRefRenderFunction, ComponentProps } from 'react';

//TODO: submit pull requests to definitelyTyped!!
type CalendarHeatmapValue = {
  date: string;
  count: string;
};

export type CalendarHeatmapProps = {
  className?: string | undefined;
} & ComponentProps<typeof ReactCalendarHeatmap>;

const CalendarHeatmapRender: ForwardRefRenderFunction<
  HTMLDivElement,
  CalendarHeatmapProps
> = ({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={clsx(className, styles.wrapper)}>
      <ReactCalendarHeatmap
        {...props}
        gutterSize={2}
        titleForValue={(value: CalendarHeatmapValue) => {
          if (!value) return '';
          return `${value.date}: ${value.count} posts`;
        }}
        classForValue={(value: CalendarHeatmapValue) => {
          if (Number(value?.count) > 4) return 'color-4';
          return `color-${value?.count ?? '0'}`;
        }}
      />
    </div>
  );
};

export const CalendarHeatmap = forwardRef(CalendarHeatmapRender);
