import { UploadImage } from './upload-image';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: UploadImage,
} as Meta<typeof UploadImage>;

type Story = StoryObj<typeof UploadImage>;

export const Default: Story = {
  args: {},
};
