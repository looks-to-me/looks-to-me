import { SessionState } from './session-state';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: SessionState,
} as Meta<typeof SessionState>;

type Story = StoryObj<typeof SessionState>;

export const Default: Story = {
  args: {},
};
