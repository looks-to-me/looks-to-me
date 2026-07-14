import { UserMuteMenu, UserMuteMenuFragment } from './user-mute-menu';
import { makeFragmentData } from '../../../../graphql/generated';
import { Button } from '../../../elements/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '../../../elements/dropdown-menu';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

export default {
  component: UserMuteMenu,
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
} as Meta<typeof UserMuteMenu>;

type Story = StoryObj<typeof UserMuteMenu>;

export const Default = {
  args: {
    fragment: makeFragmentData({
      id: 'id',
      name: 'Alice',
    }, UserMuteMenuFragment),
  },
} satisfies Story;
