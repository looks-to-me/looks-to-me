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
        <AvatarImage src="https://via.placeholder.com/160x160/" alt="@user_name" />
        <AvatarFallback>user_name</AvatarFallback>
      </>
    ),
  },
} satisfies Story;

export const Fallback = {
  args: {
    children: (
      <>
        <AvatarImage />
        <AvatarFallback>user_name</AvatarFallback>
      </>
    ),
  },
} satisfies Story;
