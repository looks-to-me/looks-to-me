import { ModalDialog } from './modal-dialog';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: ModalDialog,
} as Meta<typeof ModalDialog>;

type Story = StoryObj<typeof ModalDialog>;

export const Default = {
  args: {},
} satisfies Story;
