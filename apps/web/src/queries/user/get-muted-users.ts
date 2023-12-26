import { eq } from 'drizzle-orm';

import { getLoginUser } from './get-login-user';
import { database } from '../../app/_libs/database';
import { schema } from '../../app/_libs/database/schema';

type MutedUser = {
  id: string;
  profile: {
    name: string;
    displayName: string | null;
  };
};

export const getMutedUsers = async (): Promise<MutedUser[] | undefined> => {
  const loginUser = await getLoginUser();
  if (!loginUser) return;

  return await database()
    .select({
      id: schema.muteUsers.muteUserId,
      profile: {
        name: schema.userProfiles.name,
        displayName: schema.userProfiles.displayName,
      },
    })
    .from(schema.muteUsers)
    .innerJoin(schema.userProfiles, eq(schema.userProfiles.userId, schema.muteUsers.muteUserId))
    .where(eq(schema.muteUsers.userId, loginUser.id));
};
