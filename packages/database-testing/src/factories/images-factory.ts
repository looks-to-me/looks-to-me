import { database } from '@looks-to-me/package-database';
import { defineFactory } from '@praha/drizzle-factory';

import { usersFactory } from './users-factory';

export const imagesFactory = defineFactory({
  schema: database.schema,
  table: 'images',
  resolver: ({ sequence, use }) => {
    return {
      id: `image-${sequence}`,
      userId: () => use(usersFactory).create().then((user) => user.id),
      width: 800,
      height: 600,
      uploadedAt: new Date(),
    };
  },
});
