import { PostCreateForm } from './post-create-form';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: PostCreateForm,
} as Meta<typeof PostCreateForm>;

type Story = StoryObj<typeof PostCreateForm>;

export const Default = {
  args: {},
} satisfies Story;
