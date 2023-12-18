'use server';

import { and, eq } from 'drizzle-orm';

import { database } from '../app/_libs/database';
import { schema } from '../app/_libs/database/schema';

export type MuteUser = {
  userId: string;
  muteUserId: string;
};

export const saveMuteUser = async (muteUser: MuteUser): Promise<MuteUser> => {
  await database()
    .insert(schema.muteUsers)
    .values({
      userId: muteUser.userId,
      muteUserId: muteUser.muteUserId,
    })
    .run();

  return muteUser;
};

export const deleteMuteUser = async (muteUser: MuteUser) => {
  return await database()
    .delete(schema.muteUsers)
    .where(
      and(
        eq(schema.muteUsers.userId, muteUser.userId),
        eq(schema.muteUsers.muteUserId, muteUser.muteUserId),
      ),
    )
    .returning()
    .get();
};

export const findMuteUserByUserIdAndMuteUserId = async (
  userId: MuteUser['userId'],
  muteUserId: MuteUser['muteUserId'],
): Promise<MuteUser | undefined> => {
  return await database()
    .select({
      userId: schema.muteUsers.userId,
      muteUserId: schema.muteUsers.muteUserId,
    })
    .from(schema.muteUsers)
    .where(
      and(
        eq(schema.muteUsers.userId, userId),
        eq(schema.muteUsers.muteUserId, muteUserId),
      ),
    )
    .get();
};
