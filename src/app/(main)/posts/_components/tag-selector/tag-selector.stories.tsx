import { TagSelector } from './tag-selector';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: TagSelector,
} as Meta<typeof TagSelector>;

type Story = StoryObj<typeof TagSelector>;

export const Default = {
  args: {},
} satisfies Story;
