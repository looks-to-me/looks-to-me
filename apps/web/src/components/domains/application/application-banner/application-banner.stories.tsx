import { ApplicationBanner } from '.';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: ApplicationBanner,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof ApplicationBanner>;

type Story = StoryObj<typeof ApplicationBanner>;

export const Default = {
  args: {
    children: 'this is banner',
  },
} satisfies Story;
