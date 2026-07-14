import { database } from '@looks-to-me/package-database';
import { defineFactory } from '@praha/drizzle-factory';

export const tagsFactory = defineFactory({
  schema: database.schema,
  table: 'tags',
  resolver: ({ sequence }) => {
    return {
      id: `tag-${sequence}`,
      name: `name-${sequence}`,
    };
  },
});
