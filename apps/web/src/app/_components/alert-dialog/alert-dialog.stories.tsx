import { AlertDialog } from './alert-dialog';
import { AlertDialogAction } from './alert-dialog-action';
import { AlertDialogCancel } from './alert-dialog-cancel';
import { AlertDialogContent } from './alert-dialog-content';
import { AlertDialogDescription } from './alert-dialog-description';
import { AlertDialogTitle } from './alert-dialog-title';
import { AlertDialogTrigger } from './alert-dialog-trigger';
import { Button } from '../button';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: AlertDialog,
} as Meta<typeof AlertDialog>;

type Story = StoryObj<typeof AlertDialog>;

export const Default = {
  args: {
    children: (
      <>
        <AlertDialogTrigger>
          <Button>Open</Button>
        </AlertDialogTrigger>
        <AlertDialogContent style={{ width: '240px' }}>
          <AlertDialogTitle>Title</AlertDialogTitle>
          <AlertDialogDescription>Description</AlertDialogDescription>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <AlertDialogAction><Button variant="danger">Yes</Button></AlertDialogAction>
            <AlertDialogCancel><Button>Cancel</Button></AlertDialogCancel>
          </div>
        </AlertDialogContent>
      </>
    ),
  },

} satisfies Story;
