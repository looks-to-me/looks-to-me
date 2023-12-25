import { UserMuteList } from './user-mute-list';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: UserMuteList,
} as Meta<typeof UserMuteList>;

type Story = StoryObj<typeof UserMuteList>;

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
