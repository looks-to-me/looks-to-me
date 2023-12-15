import { initMockDatabase } from '../src/app/_libs/database/instance/mock';
import { ApplicationRoot } from '../src/components/domains/application/application-root';

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
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    Story => (
      <ApplicationRoot>
        <Story />
      </ApplicationRoot>
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
