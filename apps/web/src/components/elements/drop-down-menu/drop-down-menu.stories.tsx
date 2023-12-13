import { DropDownMenu } from './drop-down-menu';
import { DropDownMenuContent } from './drop-down-menu-content';
import { DropDownMenuGroup } from './drop-down-menu-group';
import { DropDownMenuItem } from './drop-down-menu-item';
import { DropDownMenuLabel } from './drop-down-menu-label';
import { DropDownMenuTrigger } from './drop-down-menu-trigger';
import { Button } from '../button';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: DropDownMenu,
} as Meta<typeof DropDownMenu>;

type Story = StoryObj<typeof DropDownMenu>;

export const Default = {
  args: {
    children: (
      <>
        <DropDownMenuTrigger>
          <Button>Open</Button>
        </DropDownMenuTrigger>
        <DropDownMenuContent>
          <DropDownMenuLabel>
            Label
          </DropDownMenuLabel>
          <DropDownMenuGroup>
            <DropDownMenuItem>Item 1</DropDownMenuItem>
            <DropDownMenuItem>Item 2</DropDownMenuItem>
            <DropDownMenuItem>Item 3</DropDownMenuItem>
          </DropDownMenuGroup>
          <DropDownMenuGroup>
            <DropDownMenuItem>Item 4</DropDownMenuItem>
            <DropDownMenuItem>Item 5</DropDownMenuItem>
            <DropDownMenuItem>Item 6</DropDownMenuItem>
          </DropDownMenuGroup>
        </DropDownMenuContent>
      </>
    ),
  },
} satisfies Story;
