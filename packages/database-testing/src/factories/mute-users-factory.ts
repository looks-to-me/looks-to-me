import { database } from '@looks-to-me/package-database';
import { defineFactory } from '@praha/drizzle-factory';

import { usersFactory } from './users-factory';

export const muteUsersFactory = defineFactory({
  schema: database.schema,
  table: 'muteUsers',
  resolver: ({ use }) => {
    return {
      userId: () => use(usersFactory).create().then((user) => user.id),
      muteUserId: () => use(usersFactory).create().then((user) => user.id),
    };
  },
});
