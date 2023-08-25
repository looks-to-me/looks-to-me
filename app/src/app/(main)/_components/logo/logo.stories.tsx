import { Logo } from './logo';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Logo,
} as Meta<typeof Logo>;

type Story = StoryObj<typeof Logo>;

export const Default = {
  args: {},
} satisfies Story;
