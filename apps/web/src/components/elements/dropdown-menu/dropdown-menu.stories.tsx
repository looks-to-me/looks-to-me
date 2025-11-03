import { DropdownMenu } from './dropdown-menu';
import { DropdownMenuContent } from './dropdown-menu-content';
import { DropdownMenuGroup } from './dropdown-menu-group';
import { DropdownMenuItem } from './dropdown-menu-item';
import { DropdownMenuLabel } from './dropdown-menu-label';
import { DropdownMenuTrigger } from './dropdown-menu-trigger';
import { Button } from '../button';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

export default {
  component: DropdownMenu,
} as Meta<typeof DropdownMenu>;

type Story = StoryObj<typeof DropdownMenu>;

export const Default = {
  args: {
    children: (
      <>
        <DropdownMenuTrigger>
          <Button>Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            Label
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
            <DropdownMenuItem>Item 3</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuItem>Item 4</DropdownMenuItem>
            <DropdownMenuItem>Item 5</DropdownMenuItem>
            <DropdownMenuItem>Item 6</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </>
    ),
  },
} satisfies Story;
