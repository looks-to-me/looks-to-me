import { ApplicationLayout } from './application-layout';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: ApplicationLayout,
} as Meta<typeof ApplicationLayout>;

type Story = StoryObj<typeof ApplicationLayout>;

export const Default = {
  args: {
    header: 'Header',
    children: 'Content',
  },
} satisfies Story;
