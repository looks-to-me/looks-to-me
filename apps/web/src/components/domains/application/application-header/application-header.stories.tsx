import { ApplicationHeader } from './application-header';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: ApplicationHeader,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof ApplicationHeader>;

type Story = StoryObj<typeof ApplicationHeader>;

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
