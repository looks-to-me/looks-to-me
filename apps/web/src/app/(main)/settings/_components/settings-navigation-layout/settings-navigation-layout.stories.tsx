import { SettingsNavigationLayout } from './settings-navigation-layout';
import { MuteUserList } from '../../mute-user/_components/mute-user-list';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: SettingsNavigationLayout,
} as Meta<typeof SettingsNavigationLayout>;

type Story = StoryObj<typeof SettingsNavigationLayout>;

export const Default = {
  args: {
    children: (
      <MuteUserList
        muteUsers={[
          {
            id: '1',
            profile: {
              name: 'name',
              displayName: 'displayName',
              avatarUrl: 'https://example.com/avatar.png',
            },
          },
          {
            id: '2',
            profile: {
              name: 'name',
              displayName: 'displayName',
              avatarUrl: 'https://example.com/avatar.png',
            },
          },
        ]}
      />
    ),
  },
} satisfies Story;
