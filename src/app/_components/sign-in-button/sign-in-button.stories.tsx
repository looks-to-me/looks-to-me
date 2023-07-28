import { SignInButton } from './sign-in-button';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: SignInButton,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta<typeof SignInButton>;

type Story = StoryObj<typeof SignInButton>;

export const Default: Story = {
  args: {},
};
