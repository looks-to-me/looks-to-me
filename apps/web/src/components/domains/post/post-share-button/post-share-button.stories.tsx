import { PostShareButton, PostShareButtonFragment } from './post-share-button';
import { makeFragmentData } from '../../../../graphql/generated';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

export default {
  component: PostShareButton,
} as Meta<typeof PostShareButton>;

type Story = StoryObj<typeof PostShareButton>;

export const Default = {
  args: {
    fragment: makeFragmentData({
      id: '1',
      word: 'Good',
    }, PostShareButtonFragment),
  },
} satisfies Story;
