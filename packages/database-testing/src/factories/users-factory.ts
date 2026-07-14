import { database } from '@looks-to-me/package-database';
import { defineFactory } from '@praha/drizzle-factory';

export const usersFactory = defineFactory({
  schema: database.schema,
  table: 'users',
  resolver: ({ sequence }) => {
    return {
      id: `user-${sequence}`,
      registeredAt: new Date(),
    };
  },
});
