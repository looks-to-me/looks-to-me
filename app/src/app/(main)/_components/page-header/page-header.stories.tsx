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
    userMetadata: {
      sub: '1',
      provider: 'github',
      name: 'Test',
      user_name: 'test',
      avatar_url: 'https://example.com',
    },
  },
} satisfies Story;
