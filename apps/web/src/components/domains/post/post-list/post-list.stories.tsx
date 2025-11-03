import { PostList } from './post-list';
import { PostListItem, PostListItemFragment } from './post-list-item';
import { makeFragmentData } from '../../../../graphql/generated';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

export default {
  component: PostList,
} as Meta<typeof PostList>;

type Story = StoryObj<typeof PostList>;

export const Default = {
  args: {
    posts: Array.from({ length: 20 }).map((_, index) => ({
      cursor: index.toString(),
      node: (
        <PostListItem
          key={index}
          fragment={makeFragmentData({
            id: 'id',
            word: 'Good',
            imageUrl: 'https://via.placeholder.com/160x160/',
            author: {
              id: 'id',
              name: 'user',
            },
          }, PostListItemFragment)}
        />
      ),
    })),
    fetcher: (arguments_) => Promise.resolve(Array.from({ length: 20 }).map((_, index) => ({
      cursor: (index + arguments_.size).toString(),
      node: (
        <PostListItem
          key={index + arguments_.size}
          fragment={makeFragmentData({
            id: 'id',
            word: 'Good',
            imageUrl: 'https://via.placeholder.com/160x160/',
            author: {
              id: 'id',
              name: 'user',
            },
          }, PostListItemFragment)}
        />
      ),
    }))),
  },
} satisfies Story;
