import { Sheet } from './sheet';
import { SheetContent } from './sheet-content';
import { SheetDescription } from './sheet-description';
import { SheetTitle } from './sheet-title';
import { SheetTrigger } from './sheet-trigger';
import { Button } from '../button';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Sheet,
} as Meta<typeof Sheet>;

type Story = StoryObj<typeof Sheet>;

export const Default: Story = {
  args: {
    children: (
      <>
        <SheetTrigger>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
          <SheetDescription>Description</SheetDescription>
        </SheetContent>
      </>
    ),
  },
};

export const Left: Story = {
  args: {
    children: (
      <>
        <SheetTrigger>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetTitle>Title</SheetTitle>
          <SheetDescription>Description</SheetDescription>
        </SheetContent>
      </>
    ),
  },
};

export const Top: Story = {
  args: {
    children: (
      <>
        <SheetTrigger>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent side="top">
          <SheetTitle>Title</SheetTitle>
          <SheetDescription>Description</SheetDescription>
        </SheetContent>
      </>
    ),
  },
};

export const Bottom: Story = {
  args: {
    children: (
      <>
        <SheetTrigger>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetTitle>Title</SheetTitle>
          <SheetDescription>Description</SheetDescription>
        </SheetContent>
      </>
    ),
  },
};
