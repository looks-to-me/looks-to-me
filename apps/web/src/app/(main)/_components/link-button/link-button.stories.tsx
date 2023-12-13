import { LinkButton } from './link-button';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: LinkButton,
} as Meta<typeof LinkButton>;

type Story = StoryObj<typeof LinkButton>;

export const Default = {
  args: {
    href: '/login',
  },
} satisfies Story;

export const Disabled = {
  ...Default,
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/login',
      },
    },
  },
} satisfies Story;
