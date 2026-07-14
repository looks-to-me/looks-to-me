import { LoginForm } from './login-form';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

export default {
  component: LoginForm,
} as Meta<typeof LoginForm>;

type Story = StoryObj<typeof LoginForm>;

export const Default = {
  args: {},
} satisfies Story;
