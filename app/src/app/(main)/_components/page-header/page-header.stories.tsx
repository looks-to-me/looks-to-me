import { PageHeaderPresenter } from './page-header-presenter';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: PageHeaderPresenter,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta<typeof PageHeaderPresenter>;

type Story = StoryObj<typeof PageHeaderPresenter>;

export const Default = {
  args: {
    children: 'Header',
  },
} satisfies Story;

export const LoggedIn = {
  args: {
    ...Default.args,
    user: {
      id: '1',
      profile: {
        name: 'name',
        displayName: 'displayName',
        avatarUrl: 'https://example.com',
      },
    },
  },
} satisfies Story;
