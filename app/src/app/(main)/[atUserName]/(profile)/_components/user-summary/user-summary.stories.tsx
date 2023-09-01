import { UserSummary } from './user-summary';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: UserSummary,
} as Meta<typeof UserSummary>;

type Story = StoryObj<typeof UserSummary>;

export const Default = {
  args: {
    name: 'name',
    avatarUrl: 'https://via.placeholder.com/160x160/',
    githubUrl: 'http://example.com',
    numOfPosts: 120,
  },
} satisfies Story;
