import { ApplicationLogo } from './application-logo';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: ApplicationLogo,
} as Meta<typeof ApplicationLogo>;

type Story = StoryObj<typeof ApplicationLogo>;

export const Default = {
  args: {
    style: {
      display: 'block',
      width: '4rem',
    },
  },
} satisfies Story;

export const WithText = {
  args: {
    style: {
      display: 'block',
      width: '16rem',
    },
    withText: true,
  },
} satisfies Story;
