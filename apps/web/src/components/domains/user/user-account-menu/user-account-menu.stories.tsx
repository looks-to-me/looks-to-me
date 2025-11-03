import { UserAccountMenu, UserAccountMenuFragment } from './user-account-menu';
import { makeFragmentData } from '../../../../graphql/generated';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

export default {
  component: UserAccountMenu,
} as Meta<typeof UserAccountMenu>;

type Story = StoryObj<typeof UserAccountMenu>;

export const Default = {
  args: {
    fragment: makeFragmentData({
      id: '1',
      name: 'octocat',
      displayName: 'The Octocat',
    }, UserAccountMenuFragment),
  },
} satisfies Story;
