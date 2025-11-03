import { ApplicationHeader } from './application-header';
import { ApplicationHeaderSection } from './application-header-section';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

export default {
  component: ApplicationHeader,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof ApplicationHeader>;

type Story = StoryObj<typeof ApplicationHeader>;

export const Default = {
  args: {
    children: (
      <>
        <ApplicationHeaderSection align="start">
          Left
        </ApplicationHeaderSection>
        <ApplicationHeaderSection align="end">
          Right
        </ApplicationHeaderSection>
      </>
    ),
  },
} satisfies Story;
