import { LogoutButton } from './logout-button';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: LogoutButton,
} as Meta<typeof LogoutButton>;

type Story = StoryObj<typeof LogoutButton>;

export const Default: Story = {
  args: {},
};
