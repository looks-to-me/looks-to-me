import { AspectRatio } from './aspect-ratio';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: AspectRatio,
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof AspectRatio>;

type Story = StoryObj<typeof AspectRatio>;

export const Default = {
  args: {
    ratio: 16 / 9,
    children: (
      <div style={{ width: '100%', height: '100%', background: 'gray' }}>
        16 : 9
      </div>
    ),
  },
} satisfies Story;
