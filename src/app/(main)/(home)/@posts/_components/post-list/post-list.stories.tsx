import { PostListPresenter } from './post-list-presenter';
import { Post } from '../post';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: PostListPresenter,
} as Meta<typeof PostListPresenter>;

type Story = StoryObj<typeof PostListPresenter>;

export const Default = {
  args: {
    posts: Array.from({ length: 20 }).map((_, index) => (
      <Post
        key={index}
        post={{
          id: `id-${index}`,
          word: 'Good',
          image: 'https://via.placeholder.com/300x225?text=LGTM&',
        }}
      />
    )),
    fetcher: offset => Promise.resolve(Array.from({ length: 20 }).map((_, index) => (
      <Post
        key={index + offset}
        post={{
          id: `id-${index + offset}`,
          word: 'Good',
          image: 'https://via.placeholder.com/300x225?text=LGTM&',
        }}
      />
    ))),
  },
} satisfies Story;
