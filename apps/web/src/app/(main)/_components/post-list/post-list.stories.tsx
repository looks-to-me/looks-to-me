import { PostList } from './post-list';
import { Post } from '../post';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: PostList,
} as Meta<typeof PostList>;

type Story = StoryObj<typeof PostList>;

export const Default = {
  args: {
    edges: Array.from({ length: 20 }).map((_, index) => ({
      cursor: index.toString(),
      node: (
        <Post
          key={index}
          post={{
            id: `id-${index}`,
            word: 'Good',
            image: 'https://via.placeholder.com/300x225?text=LGTM&',
            link: `/@user/posts/id-${index}`,
          }}
        />
      ),
    })),
    fetcher: arguments_ => Promise.resolve(Array.from({ length: 20 }).map((_, index) => ({
      cursor: (index + arguments_.size).toString(),
      node: (
        <Post
          key={index + arguments_.size}
          post={{
            id: `id-${index + arguments_.size}`,
            word: 'Good',
            image: 'https://via.placeholder.com/300x225?text=LGTM&',
            link: `/@user/posts/id-${index}`,
          }}
        />
      ),
    }))),
  },
} satisfies Story;
