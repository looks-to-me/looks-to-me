import { Header } from './header';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof Header>;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    children: 'Header',
  },
};
