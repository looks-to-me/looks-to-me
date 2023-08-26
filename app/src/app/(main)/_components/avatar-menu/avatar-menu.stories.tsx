import { AvatarMenu } from './avatar-menu';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: AvatarMenu,
} as Meta<typeof AvatarMenu>;

type Story = StoryObj<typeof AvatarMenu>;

export const Default = {
  args: {
    userMetadata: {
      sub: '1',
      provider: 'github',
      name: 'Test',
      user_name: 'test',
      avatar_url: 'https://example.com',
    },
  },
} satisfies Story;
