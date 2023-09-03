import { ApplicationLogoWithText } from './application-logo-with-text';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: ApplicationLogoWithText,
} as Meta<typeof ApplicationLogoWithText>;

type Story = StoryObj<typeof ApplicationLogoWithText>;

export const Default = {} satisfies Story;
