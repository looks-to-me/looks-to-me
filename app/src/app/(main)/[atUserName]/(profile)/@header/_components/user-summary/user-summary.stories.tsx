import { UserSummary } from './user-summary';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: UserSummary,
} as Meta<typeof UserSummary>;

type Story = StoryObj<typeof UserSummary>;

export const Default = {
  args: {
    user: {
      id: '1',
      profile: {
        name: 'name',
        displayName: 'displayName',
        avatarUrl: 'https://example.com',
      },
    },
    numOfPosts: 120,
  },
} satisfies Story;
