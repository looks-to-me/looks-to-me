import { VariableTextInput } from './variable-text-input';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: VariableTextInput,
} as Meta<typeof VariableTextInput>;

type Story = StoryObj<typeof VariableTextInput>;

export const Default = {
  args: {},
} satisfies Story;
