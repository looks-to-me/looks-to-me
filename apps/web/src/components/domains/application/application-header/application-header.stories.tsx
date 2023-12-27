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
    user: undefined,
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
      },
    },
  },
} satisfies Story;

export const WithWarningBanner = {
  args: {
    ...Default.args,
    bannerProps: {
      children: 'warning banner',
      variant:'warning',
    },
  },
} satisfies Story;
