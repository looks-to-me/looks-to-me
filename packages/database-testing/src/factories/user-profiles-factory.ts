import { database } from '@looks-to-me/package-database';
import { defineFactory } from '@praha/drizzle-factory';

import { usersFactory } from './users-factory';

export const userProfilesFactory = defineFactory({
  schema: database.schema,
  table: 'userProfiles',
  resolver: ({ sequence, use }) => {
    return {
      userId: () => use(usersFactory).create().then((user) => user.id),
      name: `name-${sequence}`,
      displayName: `display-name-${sequence}`,
      avatarUrl: `https://example.com/avatar-${sequence}.png`,
    };
  },
});
