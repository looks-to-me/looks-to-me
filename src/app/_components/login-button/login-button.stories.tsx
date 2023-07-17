import { LoginButton } from './login-button';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: LoginButton,
} as Meta<typeof LoginButton>;

type Story = StoryObj<typeof LoginButton>;

export const Default: Story = {
  args: {},
};
