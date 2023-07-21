import { PostCreateForm } from './PostCreateForm';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: PostCreateForm,
} as Meta<typeof PostCreateForm>;

type Story = StoryObj<typeof PostCreateForm>;

export const Default: Story = {
  args: {},
};
