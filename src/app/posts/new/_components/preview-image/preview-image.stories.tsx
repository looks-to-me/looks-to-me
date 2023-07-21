import { PreviewImage } from './preview-image';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: PreviewImage,
} as Meta<typeof PreviewImage>;

type Story = StoryObj<typeof PreviewImage>;

export const Default: Story = {
  args: {},
};
