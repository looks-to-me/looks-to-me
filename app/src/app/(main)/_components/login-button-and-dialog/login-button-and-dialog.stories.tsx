import { LoginButtonAndDialog } from './login-button-and-dialog';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: LoginButtonAndDialog,
} as Meta<typeof LoginButtonAndDialog>;

type Story = StoryObj<typeof LoginButtonAndDialog>;

export const Default = {
  args: {},
} satisfies Story;
