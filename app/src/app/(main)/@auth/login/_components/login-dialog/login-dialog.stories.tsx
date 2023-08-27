import { LoginDialog } from './login-dialog';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: LoginDialog,
} as Meta<typeof LoginDialog>;

type Story = StoryObj<typeof LoginDialog>;

export const Default = {
  args: {},
} satisfies Story;
