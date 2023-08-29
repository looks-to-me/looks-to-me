import { LoginForm } from './login-form';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: LoginForm,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta<typeof LoginForm>;

type Story = StoryObj<typeof LoginForm>;

export const Default = {
  args: {},
} satisfies Story;
