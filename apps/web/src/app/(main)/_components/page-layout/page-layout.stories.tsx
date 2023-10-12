import { PageLayout } from './page-layout';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: PageLayout,
} as Meta<typeof PageLayout>;

type Story = StoryObj<typeof PageLayout>;

export const Default = {
  args: {
    header: 'Header',
    children: 'Content',
  },
} satisfies Story;
