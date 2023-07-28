import { Sheet } from './sheet';
import { SheetContent } from './sheet-content';
import { SheetDescription } from './sheet-description';
import { SheetSection } from './sheet-section';
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
          <SheetSection style={{ marginRight: '3rem' }}>
            <SheetTitle>Title</SheetTitle>
            <SheetDescription>Description</SheetDescription>
          </SheetSection>
        </SheetContent>
      </>
    ),
  },
};

export const MultiSection: Story = {
  args: {
    children: (
      <>
        <SheetTrigger>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetSection style={{ marginRight: '3rem' }}>
            <SheetTitle>Title</SheetTitle>
            <SheetDescription>Description</SheetDescription>
          </SheetSection>
          <SheetSection style={{ flexGrow: 1 }}>
            Content
          </SheetSection>
          <SheetSection>
            Footer
          </SheetSection>
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
          <SheetSection style={{ marginRight: '3rem' }}>
            <SheetTitle>Title</SheetTitle>
            <SheetDescription>Description</SheetDescription>
          </SheetSection>
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
          <SheetSection style={{ marginRight: '3rem' }}>
            <SheetTitle>Title</SheetTitle>
            <SheetDescription>Description</SheetDescription>
          </SheetSection>
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
          <SheetSection style={{ marginRight: '3rem' }}>
            <SheetTitle>Title</SheetTitle>
            <SheetDescription>Description</SheetDescription>
          </SheetSection>
        </SheetContent>
      </>
    ),
  },
};
