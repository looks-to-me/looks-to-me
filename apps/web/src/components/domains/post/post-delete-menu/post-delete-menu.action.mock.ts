import { R } from '@praha/byethrow';
import { fn } from 'storybook/test';

import type { DeletePostError, DeletePostInput, DeletePostOutput } from './post-delete-menu.action';

export const deletePost = fn<(input: DeletePostInput) => R.ResultAsync<DeletePostOutput, DeletePostError>>()
  .mockName('deletePost')
  .mockResolvedValue(R.succeed({ message: 'The post has been successfully deleted.', redirect: '/@Alice' }));
