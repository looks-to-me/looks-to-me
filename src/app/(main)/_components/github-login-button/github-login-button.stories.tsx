import { GitHubLoginButton } from './github-login-button';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: GitHubLoginButton,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta<typeof GitHubLoginButton>;

type Story = StoryObj<typeof GitHubLoginButton>;

export const Default = {
  args: {},
} satisfies Story;
