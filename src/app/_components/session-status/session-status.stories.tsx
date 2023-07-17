import { SessionStatus } from './session-status';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: SessionStatus,
} as Meta<typeof SessionStatus>;

type Story = StoryObj<typeof SessionStatus>;

export const Default: Story = {
  args: {},
};
