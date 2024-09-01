import { Tooltip } from './tooltip';
import { TooltipContent } from './tooltip-content';
import { TooltipProvider } from './tooltip-provider';
import { TooltipTrigger } from './tooltip-trigger';
import { Button } from '../button';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Tooltip,
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
} as Meta<typeof Tooltip>;

type Story = StoryObj<typeof Tooltip>;

export const Default = {
  args: {
    children: (
      <>
        <TooltipTrigger>
          <Button>Hover</Button>
        </TooltipTrigger>
        <TooltipContent>
          Tooltip
        </TooltipContent>
      </>
    ),
  },
} satisfies Story;
