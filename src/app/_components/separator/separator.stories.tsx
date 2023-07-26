import { Separator } from './separator';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Separator,
} as Meta<typeof Separator>;

type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  decorators: [
    Story => (
      <div style={{ width: '160px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  decorators: [
    Story => (
      <div style={{ height: '160px' }}>
        <Story />
      </div>
    ),
  ],
};
