import { LgtmText } from './lgtm-text';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: LgtmText,
} as Meta<typeof LgtmText>;

type Story = StoryObj<typeof LgtmText>;

export const Default = {
  args: {
    word:'GOOD',
  },
} satisfies Story;

export const EmptyText = {
  args: {
    word:'',
  },
} satisfies Story;

export const LongText = {
  args: {
    word:'GOOOOOOOOOOOOD',
  },
} satisfies Story;
