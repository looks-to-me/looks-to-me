import { PostMenu } from './post-menu';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: PostMenu,
} as Meta<typeof PostMenu>;

type Story = StoryObj<typeof PostMenu>;

export const Default = {
  args: {},
} satisfies Story;
