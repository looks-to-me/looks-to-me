import { LoginButton } from './login-button';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

export default {
  component: LoginButton,
} as Meta<typeof LoginButton>;

type Story = StoryObj<typeof LoginButton>;

export const Default = {
  args: {},
} satisfies Story;
