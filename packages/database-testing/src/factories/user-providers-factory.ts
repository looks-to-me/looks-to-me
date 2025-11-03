import { database } from '@looks-to-me/package-database';
import { defineFactory } from '@praha/drizzle-factory';

import { usersFactory } from './users-factory';

export const userProvidersFactory = defineFactory({
  schema: database.schema,
  table: 'userProviders',
  resolver: ({ sequence, use }) => {
    return {
      userId: () => use(usersFactory).create().then((user) => user.id),
      type: 'github',
      sub: sequence.toString(),
    };
  },
});
