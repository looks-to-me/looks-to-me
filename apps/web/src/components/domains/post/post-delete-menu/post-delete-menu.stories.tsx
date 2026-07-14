import { PostDeleteMenu, PostDeleteMenuFragment } from './post-delete-menu';
import { makeFragmentData } from '../../../../graphql/generated';
import { Button } from '../../../elements/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '../../../elements/dropdown-menu';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

export default {
  component: PostDeleteMenu,
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
} as Meta<typeof PostDeleteMenu>;

type Story = StoryObj<typeof PostDeleteMenu>;

export const Default = {
  args: {
    fragment: makeFragmentData({
      id: 'id',
    }, PostDeleteMenuFragment),
  },
} satisfies Story;
