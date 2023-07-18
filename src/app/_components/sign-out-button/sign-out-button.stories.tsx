import { SignOutButton } from './sign-out-button';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: SignOutButton,
} as Meta<typeof SignOutButton>;

type Story = StoryObj<typeof SignOutButton>;

export const Default: Story = {
  args: {},
};
