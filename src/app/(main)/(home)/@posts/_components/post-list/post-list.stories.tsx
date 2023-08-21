import { PostListPresenter } from './post-list-presenter';
import { Post } from '../../../../_components/post';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: PostListPresenter,
} as Meta<typeof PostListPresenter>;

type Story = StoryObj<typeof PostListPresenter>;

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
