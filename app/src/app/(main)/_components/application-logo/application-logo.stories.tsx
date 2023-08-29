import { ApplicationLogo } from './application-logo';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: ApplicationLogo,
} as Meta<typeof ApplicationLogo>;

type Story = StoryObj<typeof ApplicationLogo>;

export const Default = {
  args: {},
} satisfies Story;
