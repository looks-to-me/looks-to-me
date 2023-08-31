import { Avatar } from './avatar';
import { AvatarFallback } from './avatar-fallback';
import { AvatarImage } from './avatar-image';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Avatar,
} as Meta<typeof Avatar>;

type Story = StoryObj<typeof Avatar>;

export const Default = {
  args: {
    children: (
      <>
        <AvatarImage src="https://github.com/sushidesu.png" alt="@sushidesu" />
        <AvatarFallback />
      </>
    ),
  },
} satisfies Story;

export const Large = {
  args: {
    size: 10,
    children: (
      <>
        <AvatarImage src="https://github.com/sushidesu.png" alt="@sushidesu" />
        <AvatarFallback />
      </>
    ),
  },
} satisfies Story;

export const Fallback = {
  args: {
    children: (
      <>
        <AvatarImage />
        <AvatarFallback>S</AvatarFallback>
      </>
    ),
  },
} satisfies Story;
