import { UserUnmuteMenu, UserUnmuteMenuFragment } from './user-unmute-menu';
import { makeFragmentData } from '../../../../graphql/generated';
import { Button } from '../../../elements/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '../../../elements/dropdown-menu';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

export default {
  component: UserUnmuteMenu,
  decorators: [
    (Story) => {
      return (
        <DropdownMenu open>
          <DropdownMenuTrigger>
            <Button>Open</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Story />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  ],
} as Meta<typeof UserUnmuteMenu>;

type Story = StoryObj<typeof UserUnmuteMenu>;

export const Default = {
  args: {
    fragment: makeFragmentData({
      id: 'id',
      name: 'Alice',
    }, UserUnmuteMenuFragment),
  },
} satisfies Story;
