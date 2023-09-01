import { ShareButton } from './share-button';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: ShareButton,
} as Meta<typeof ShareButton>;

type Story = StoryObj<typeof ShareButton>;

export const Default = {
  args: {
    text: 'share',
  },
} satisfies Story;
