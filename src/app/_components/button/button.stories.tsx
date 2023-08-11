import { Button } from './button';
import CloseIcon from '../../_icons/close.svg';
import { AccessibleIcon } from '../accessible-icon';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Button,
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Default = {
  args: {
    children: 'Button',
  },
} satisfies Story;

export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
  },
} satisfies Story;

export const Primary = {
  args: {
    ...Default.args,
    variant: 'primary',
  },
} satisfies Story;

export const Danger = {
  args: {
    ...Default.args,
    variant: 'danger',
  },
} satisfies Story;

export const Ghost = {
  args: {
    ...Default.args,
    variant: 'ghost',
  },
} satisfies Story;

export const Borderless = {
  args: {
    ...Default.args,
    borderless: true,
  },
} satisfies Story;

export const Icon = {
  args: {
    ...Default.args,
    children: (
      <AccessibleIcon label="Close">
        <CloseIcon />
      </AccessibleIcon>
    ),
    size: 'icon',
  },
} satisfies Story;

export const Tiny = {
  args: {
    ...Default.args,
    size: 'tiny',
  },
} satisfies Story;

export const Medium = {
  args: {
    ...Default.args,
    size: 'medium',
  },
} satisfies Story;

export const Large = {
  args: {
    ...Default.args,
    size: 'large',
  },
} satisfies Story;
