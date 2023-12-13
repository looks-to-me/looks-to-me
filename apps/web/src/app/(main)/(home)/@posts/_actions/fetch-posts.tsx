'use server';

import { and, desc, eq, lt, notInArray } from 'drizzle-orm';

import { database } from '../../../../_libs/database';
import { schema } from '../../../../_libs/database/schema';
import { findMuteUsersByUserId } from '../../../_repositories/mute-user-repository';

import type { PostWithUser } from '../../../../../components/elements/infinite-scroll/_libs/get-infinityscroll-props-by-posts';

const limit = 32;

type FetchPostProps = {
  cursor?: string | undefined;
  loginUserId?: string | undefined;
};

export const fetchPosts = async ({ cursor, loginUserId }: FetchPostProps): Promise<PostWithUser[]> => {
  const muteUsers = loginUserId ?
    await findMuteUsersByUserId(loginUserId)
    : [];
  const muteUserIds = muteUsers.map(user => user.muteUserId);

  return await database()
    .select({
      id: schema.posts.id,
      word: schema.posts.word,
      postedAt: schema.posts.postedAt,
      user: {
        name: schema.userProfiles.name,
      },
    })
    .from(schema.posts)
    .innerJoin(schema.users, eq(schema.posts.userId, schema.users.id))
    .innerJoin(
      schema.userProfiles,
      eq(schema.userProfiles.userId, schema.users.id),
    )
    .where(
      and(
        cursor ? lt(schema.posts.postedAt, new Date(cursor)) : undefined,
        muteUserIds.length
          ? notInArray(schema.posts.userId, muteUserIds)
          : undefined,
      ),
    )
    .orderBy(desc(schema.posts.postedAt))
    .limit(limit)
    .all();
};
