import { Header } from './header';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Header,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta<typeof Header>;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    children: 'Header',
  },
};

export const LoggedIn: Story = {
  args: {
    ...Default.args,
    authUser: {
      id: '1',
      accountName: 'test',
      displayName: 'Test',
      avatarUrl: 'https://example.com',
    },
  },
};
