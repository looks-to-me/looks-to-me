import { Popover } from './popover';
import { PopoverContent } from './popover-content';
import { PopoverTrigger } from './popover-trigger';
import { Button } from '../button';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Popover,
} as Meta<typeof Popover>;

type Story = StoryObj<typeof Popover>;

export const Default = {
  args: {
    children: (
      <>
        <PopoverTrigger>
          <Button>Open</Button>
        </PopoverTrigger>
        <PopoverContent>
          Content
        </PopoverContent>
      </>
    ),
  },
} satisfies Story;
