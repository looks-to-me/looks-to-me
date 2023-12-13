import { AccessibleIcon } from './accessible-icon';
import CloseIcon from '../../../app/_icons/close.svg';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: AccessibleIcon,
} as Meta<typeof AccessibleIcon>;

type Story = StoryObj<typeof AccessibleIcon>;

export const Default = {
  args: {
    label: 'Close',
    children: <CloseIcon />,
  },
} satisfies Story;
