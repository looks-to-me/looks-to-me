import { R } from '@praha/byethrow';
import { fn } from 'storybook/test';

import type { UnmuteUserError, UnmuteUserInput, UnmuteUserOutput } from './user-unmute-menu.action';

export const unmuteUser = fn<(input: UnmuteUserInput) => R.ResultAsync<UnmuteUserOutput, UnmuteUserError>>()
  .mockName('unmuteUser')
  .mockResolvedValue(R.succeed({ message: '@Alice has been unmuted.' }));
