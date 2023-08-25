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
    fetcher: async args => Promise.resolve(Array.from({ length: 20 }).map((_, index) => ({
      cursor: (index + args.size).toString(),
      node: (
        <div key={index + args.size} style={{ width: '100%', height: '64px' }}>
          Item {index + args.size}
        </div>
      ),
    }))),
  },
} satisfies Story;
