import { PostList } from './post-list';
import { Post } from '../post';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: PostList,
} as Meta<typeof PostList>;

type Story = StoryObj<typeof PostList>;

export const Default = {
  args: {
    posts: Array.from({ length: 20 }).map((_, index) => ({
      cursor: index.toString(),
      node: (
        <Post
          key={index}
          post={{
            id: `id-${index}`,
            word: 'Good',
            image: 'https://via.placeholder.com/300x225?text=LGTM&',
          }}
        />
      ),
    })),
    fetcher: args => Promise.resolve(Array.from({ length: 20 }).map((_, index) => ({
      cursor: (index + args.size).toString(),
      node: (
        <Post
          key={index + args.size}
          post={{
            id: `id-${index + args.size}`,
            word: 'Good',
            image: 'https://via.placeholder.com/300x225?text=LGTM&',
          }}
        />
      ),
    }))),
  },
} satisfies Story;
