import { InfiniteScroll } from './infinite-scroll';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: InfiniteScroll,
} as Meta<typeof InfiniteScroll>;

type Story = StoryObj<typeof InfiniteScroll>;

export const Default: Story = {
  args: {
    nodes: Array.from({ length: 20 }).map((_, index) => (
      <div key={index} style={{ width: '100%', height: '64px' }}>
        Item {index}
      </div>
    )),
    fetcher: async offset => Promise.resolve(Array.from({ length: 20 }).map((_, index) => (
      <div key={index} style={{ width: '100%', height: '64px' }}>
        Item {index + offset}
      </div>
    ))),
  },
};
