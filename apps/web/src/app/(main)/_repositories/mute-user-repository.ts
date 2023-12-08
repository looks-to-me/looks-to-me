'use server';

import { and, eq } from 'drizzle-orm';

import { database } from '../../_libs/database';
import { schema } from '../../_libs/database/schema';

export type MuteUser = {
  userId: string;
  muteUserId: string;
};

export const insertMuteUser = async (muteUser: MuteUser): Promise<MuteUser> => {
  await database()
    .insert(schema.muteUsers)
    .values({
      userId: muteUser.userId,
      muteUserId: muteUser.muteUserId,
    })
    .run();
  return muteUser;
};

export const findMuteUsersByUserId = async (userId: MuteUser['userId']): Promise<MuteUser[]> => {
  return await database()
    .select({
      userId: schema.muteUsers.userId,
      muteUserId: schema.muteUsers.muteUserId,
    })
    .from(schema.muteUsers)
    .where(eq(schema.muteUsers.userId, userId))
    .all();
};

export const findMuteUserByUserIdAndMuteUserId = async ({ userId, muteUserId }: MuteUser): Promise<MuteUser | undefined> => {
  return await database()
    .select({
      userId: schema.muteUsers.userId,
      muteUserId: schema.muteUsers.muteUserId,
    })
    .from(schema.muteUsers)
    .where(and(
      eq(schema.muteUsers.userId, userId),
      eq(schema.muteUsers.muteUserId, muteUserId),
    ),
    )
    .get();
};

export const deleteMuteUser = async ({ userId, muteUserId }: MuteUser): Promise<void> => {
  await database()
    .delete(schema.muteUsers)
    .where(and(
      eq(schema.muteUsers.userId, userId),
      eq(schema.muteUsers.muteUserId, muteUserId),
    ),
    );
};
