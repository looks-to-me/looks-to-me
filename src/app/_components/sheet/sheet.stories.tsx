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

export const Default = {
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
} satisfies Story;

export const MultiSection = {
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
} satisfies Story;

export const Left = {
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
} satisfies Story;

export const Top = {
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
} satisfies Story;

export const Bottom = {
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
} satisfies Story;
