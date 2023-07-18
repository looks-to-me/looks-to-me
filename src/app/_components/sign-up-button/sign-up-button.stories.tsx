import { SignUpButton } from './sign-up-button';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: SignUpButton,
} as Meta<typeof SignUpButton>;

type Story = StoryObj<typeof SignUpButton>;

export const Default: Story = {
  args: {},
};
