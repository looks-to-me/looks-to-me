import { HeaderPresenter } from './header-presenter';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: HeaderPresenter,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta<typeof HeaderPresenter>;

type Story = StoryObj<typeof HeaderPresenter>;

export const Default = {
  args: {
    children: 'Header',
  },
} satisfies Story;

export const LoggedIn = {
  args: {
    ...Default.args,
    authUser: {
      id: '1',
      accountName: 'test',
      displayName: 'Test',
      avatarUrl: 'https://example.com',
    },
  },
} satisfies Story;
