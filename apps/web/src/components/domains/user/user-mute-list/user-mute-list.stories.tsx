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
        },
      },
      {
        id: '1',
        profile: {
          name: 'name',
          displayName: 'displayName',
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
