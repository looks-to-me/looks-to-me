import { Banner } from '.';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

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
