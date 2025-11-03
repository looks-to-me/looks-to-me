// import { initMockDatabase } from '../src/app/_libs/database/instance/mock';
import { ApplicationRoot } from '../src/components/domains/application/application-root';

import type { Preview } from '@storybook/nextjs-vite';

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
    test: {
      restoreMocks: false,
    },
  },
  decorators: [
    (Story) => (
      <ApplicationRoot>
        <Story />
      </ApplicationRoot>
    ),
  ],
  // TODO
  loaders: [
    async () => {
      // await initMockDatabase();
      return {};
    },
  ],
};

export default preview;
