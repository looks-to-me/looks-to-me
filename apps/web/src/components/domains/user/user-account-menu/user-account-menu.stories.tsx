import { UserAccountMenu } from './user-account-menu';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: UserAccountMenu,
} as Meta<typeof UserAccountMenu>;

type Story = StoryObj<typeof UserAccountMenu>;

export const Default = {
  args: {
    user: {
      id: '1',
      profile: {
        name: 'name',
        displayName: 'displayName',
      },
    },
  },
} satisfies Story;
