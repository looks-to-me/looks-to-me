import { XIcon } from 'lucide-react';

import { AccessibleIcon } from './accessible-icon';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: AccessibleIcon,
} as Meta<typeof AccessibleIcon>;

type Story = StoryObj<typeof AccessibleIcon>;

export const Default = {
  args: {
    label: 'Close',
    children: <XIcon />,
  },
} satisfies Story;
