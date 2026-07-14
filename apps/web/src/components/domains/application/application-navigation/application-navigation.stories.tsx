import { ApplicationNavigation } from './application-navigation';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

export default {
  component: ApplicationNavigation,
} as Meta<typeof ApplicationNavigation>;

type Story = StoryObj<typeof ApplicationNavigation>;

export const Default = {
  args: {},
} satisfies Story;
