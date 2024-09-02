import { InfiniteScroll } from './infinite-scroll';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: InfiniteScroll,
} as Meta<typeof InfiniteScroll>;

type Story = StoryObj<typeof InfiniteScroll>;

export const Default = {
  args: {
    edges: Array.from({ length: 20 }).map((_, index) => ({
      cursor: index.toString(),
      node: (
        <div key={index} style={{ width: '100%', height: '64px' }}>
          Item {index}
        </div>
      ),
    })),
    fetcher: (arguments_) => Promise.resolve(Array.from({ length: 20 }).map((_, index) => ({
      cursor: (index + arguments_.size).toString(),
      node: (
        <div key={index + arguments_.size} style={{ width: '100%', height: '64px' }}>
          Item {index + arguments_.size}
        </div>
      ),
    }))),
  },
} satisfies Story;
