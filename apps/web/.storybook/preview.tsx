import { Root } from '../src/app/_components/root';
import { initMockDatabase } from '../src/app/_libs/database/instance/mock';

import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    Story => (
      <Root>
        <Story />
      </Root>
    ),
  ],
  loaders: [
    async () => {
      await initMockDatabase();
      return {};
    },
  ],
};

export default preview;
