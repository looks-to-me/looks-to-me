import { VisuallyHidden } from './visually-hidden';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: VisuallyHidden,
} as Meta<typeof VisuallyHidden>;

type Story = StoryObj<typeof VisuallyHidden>;

export const Default = {
  args: {
    children: 'hidden text',
  },
} satisfies Story;
