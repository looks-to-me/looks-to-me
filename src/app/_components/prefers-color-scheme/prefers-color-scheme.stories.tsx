import { PrefersColorScheme } from './prefers-color-scheme';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: PrefersColorScheme,
} as Meta<typeof PrefersColorScheme>;

type Story = StoryObj<typeof PrefersColorScheme>;

export const Default: Story = {
  args: {
    light: <div>Light</div>,
    dark: <div>Dark</div>,
  },
};
