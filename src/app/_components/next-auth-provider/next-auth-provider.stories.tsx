import { NextAuthProvider } from './next-auth-provider';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: NextAuthProvider,
} as Meta<typeof NextAuthProvider>;

type Story = StoryObj<typeof NextAuthProvider>;

export const Default: Story = {
  args: {},
};
