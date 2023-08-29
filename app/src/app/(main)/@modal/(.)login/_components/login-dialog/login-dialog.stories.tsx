import { LoginDialog } from './login-dialog';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: LoginDialog,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta<typeof LoginDialog>;

type Story = StoryObj<typeof LoginDialog>;

export const Default = {
  args: {
    canGoBack: false,
  },
} satisfies Story;
