import { LogoutButton } from './logout-button';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: LogoutButton,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta<typeof LogoutButton>;

type Story = StoryObj<typeof LogoutButton>;

export const Default = {
  args: {},
} satisfies Story;
