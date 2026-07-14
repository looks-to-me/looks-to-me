import { ApplicationLogo } from './application-logo';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

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

export const WithTitle = {
  args: {
    style: {
      display: 'block',
      width: '16rem',
    },
    withTitle: true,
  },
} satisfies Story;
