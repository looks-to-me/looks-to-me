import { MuteUserList } from './mute-user-list';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: MuteUserList,
} as Meta<typeof MuteUserList>;

type Story = StoryObj<typeof MuteUserList>;

export const Default = {
  args: {
    muteUsers: [
      {
        id: '1',
        profile: {
          name: 'name',
          displayName: 'displayName',
          avatarUrl: 'https://example.com/avatar.png',
        },
      },
      {
        id: '1',
        profile: {
          name: 'name',
          displayName: 'displayName',
          avatarUrl: 'https://example.com/avatar.png',
        },
      },
    ],
  },
} satisfies Story;

export const Empty = {
  args: {
    muteUsers: [],
  },
} satisfies Story;
