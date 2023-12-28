import { GithubIcon } from './github-icon';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: GithubIcon,
} as Meta<typeof GithubIcon>;

type Story = StoryObj<typeof GithubIcon>;

export const Default = {
  args: {},
} satisfies Story;
