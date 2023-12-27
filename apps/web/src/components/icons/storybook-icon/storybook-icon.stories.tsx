import { StorybookIcon } from './storybook-icon';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: StorybookIcon,
} as Meta<typeof StorybookIcon>;

type Story = StoryObj<typeof StorybookIcon>;

export const Default = {
  args: {},
} satisfies Story;
