import { NewPostButton } from './new-post-button';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

export default {
  component: NewPostButton,
} as Meta<typeof NewPostButton>;

type Story = StoryObj<typeof NewPostButton>;

export const Default = {
  args: {},
} satisfies Story;
