import { CalendarHeatmap } from './calendar-heatmap';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: CalendarHeatmap,

  decorators: [
    (Story) => (
      <div style={{ width: '900px' }}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof CalendarHeatmap>;

type Story = StoryObj<typeof CalendarHeatmap>;

export const Default = {
  args: {
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    values: [
      { date: '2023-01-01', count: '0' },
      { date: '2023-01-02', count: '1' },
      { date: '2023-01-03', count: '2' },
      { date: '2023-01-04', count: '3' },
      { date: '2023-01-05', count: '4' },
      { date: '2023-01-07', count: '0' },
      { date: '2023-01-08', count: '2' },
      { date: '2023-02-08', count: '2' },
      { date: '2023-04-08', count: '2' },
      { date: '2023-06-08', count: '2' },
    ],
  },
} satisfies Story;
