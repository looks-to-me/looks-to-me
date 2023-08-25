import { AvatarAndUserMenu } from './avatar-and-user-menu';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: AvatarAndUserMenu,
} as Meta<typeof AvatarAndUserMenu>;

type Story = StoryObj<typeof AvatarAndUserMenu>;

export const Default = {
  args: {
    authUser: {
      id: '1',
      accountName: 'test',
      displayName: 'Test',
      avatarUrl: 'https://example.com',
    },
  },
} satisfies Story;
