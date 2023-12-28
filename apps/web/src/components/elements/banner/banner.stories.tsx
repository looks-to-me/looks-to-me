import { Banner } from '.';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Banner,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof Banner>;

type Story = StoryObj<typeof Banner>;

export const Default = {
  args: {
    children: 'this is banner',
  },
} satisfies Story;
