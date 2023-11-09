import { InputImageWithPreview } from './input-image-with-preview';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: InputImageWithPreview,
} as Meta<typeof InputImageWithPreview>;

type Story = StoryObj<typeof InputImageWithPreview>;

export const Default = {
  args: {},
} satisfies Story;
