import { Post } from './post';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Post,
  decorators: [
    Story => (
      <div style={{ width: '16rem' }}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Post>;

type Story = StoryObj<typeof Post>;

export const Default = {
  args: {
    post: {
      id: 'id',
      word: 'Good',
      image: 'https://via.placeholder.com/300x225?text=LGTM&',
    },
  },
} satisfies Story;

export const Portrait = {
  args: {
    ...Default.args,
    post: {
      ...Default.args.post,
      image: 'https://via.placeholder.com/225x300?text=LGTM&',
    },
  },
} satisfies Story;

export const Square = {
  args: {
    ...Default.args,
    post: {
      ...Default.args.post,
      image: 'https://via.placeholder.com/300x300?text=LGTM&',
    },
  },
} satisfies Story;
