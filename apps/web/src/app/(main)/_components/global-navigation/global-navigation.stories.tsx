import { GlobalNavigation } from './global-navigation';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: GlobalNavigation,
} as Meta<typeof GlobalNavigation>;

type Story = StoryObj<typeof GlobalNavigation>;

export const Default = {
  args: {},
} satisfies Story;
