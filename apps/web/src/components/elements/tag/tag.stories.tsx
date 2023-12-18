import { Tag } from './tag';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Tag,
} as Meta<typeof Tag>;

type Story = StoryObj<typeof Tag>;

export const Normal = {
  args: {
    variant: 'normal',
    children: 'Normal Tag',
  },
} satisfies Story;

export const Primary = {
  args: {
    children: 'Primary Tag',
    variant: 'primary',
  },
} satisfies Story;
