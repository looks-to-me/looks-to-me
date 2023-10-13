import { AvatarMenu } from './avatar-menu';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: AvatarMenu,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta<typeof AvatarMenu>;

type Story = StoryObj<typeof AvatarMenu>;

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
  },
} satisfies Story;
