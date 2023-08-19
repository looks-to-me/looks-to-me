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
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback />
      </Avatar>
    ),
  },
} satisfies Story;

export const Fallback = {
  args: {
    children: (
      <Avatar>
        <AvatarImage src={undefined} />
        <AvatarFallback />
      </Avatar>
    ),
  },
} satisfies Story;
