import { Dialog } from './dialog';
import { DialogClose } from './dialog-close';
import { DialogContent } from './dialog-content';
import { DialogDescription } from './dialog-description';
import { DialogTitle } from './dialog-title';
import { DialogTrigger } from './dialog-trigger';
import { Button } from '../button';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Dialog,
} as Meta<typeof Dialog>;

type Story = StoryObj<typeof Dialog>;

export const Default = {
  args: {
    children: (
      <>
        <DialogTrigger>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent style={{ width: '240px' }}>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
          <DialogClose>
            <Button style={{ alignSelf: 'end' }}>Action</Button>
          </DialogClose>
        </DialogContent>
      </>
    ),
  },
} satisfies Story;

export const WithClose = {
  args: {
    children: (
      <>
        <DialogTrigger>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent style={{ width: '240px' }} withClose>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
          <DialogClose>
            <Button style={{ alignSelf: 'end' }}>Action</Button>
          </DialogClose>
        </DialogContent>
      </>
    ),
  },
} satisfies Story;
