import { R } from '@praha/byethrow';
import { fn } from 'storybook/test';

import type { MuteUserError, MuteUserInput, MuteUserOutput } from './user-mute-menu.action';

export const muteUser = fn<(input: MuteUserInput) => R.ResultAsync<MuteUserOutput, MuteUserError>>()
  .mockName('muteUser')
  .mockResolvedValue(R.succeed({ message: '@Alice has been muted.' }));
