import { UserSummary } from './user-summary';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

export default {
  component: UserSummary,
} as Meta<typeof UserSummary>;

type Story = StoryObj<typeof UserSummary>;

export const Default = {
  args: {
    user: {
      id: '1',
      profile: {
        name: 'octocat',
        displayName: 'The Octocat',
      },
    },
    numOfPosts: 120,
  },
} satisfies Story;
