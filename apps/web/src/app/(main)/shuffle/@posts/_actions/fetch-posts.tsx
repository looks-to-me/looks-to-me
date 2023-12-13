'use server';

import { eq, inArray, notInArray, sql } from 'drizzle-orm';

import { database } from '../../../../_libs/database';
import { schema } from '../../../../_libs/database/schema';
import { findMuteUsersByUserId } from '../../../_repositories/mute-user-repository';

import type { PostWithUser } from '../../../../../components/elements/infinite-scroll/_libs/get-infinityscroll-props-by-posts';

const shuffle = <T extends object>(array: Array<T>): Array<T> => {
  return array.reduce((previous, current, index) => {
    const key = Math.floor(Math.random() * (index + 1));
    previous[index] = previous[key]!;
    previous[key] = current;
    return previous;
  }, [] as Array<T>);
};

const limit = 32;

type FetchProps = {
  loginUserId?: string | undefined;
};
export const fetchPosts = async ({ loginUserId }: FetchProps): Promise<PostWithUser[]> => {
  const muteUsers = loginUserId ?
    await findMuteUsersByUserId(loginUserId)
    : [];
  const muteUsersIds = muteUsers.map(user => user.muteUserId);

  //TODO: Exclude already retrieved postIds.
  const randomPostIds = await(async () => {
    const randomPosts = await database()
      .select({
        id: schema.posts.id,
      })
      .from(schema.posts)
      .where(
        muteUsersIds.length
          ? notInArray(schema.posts.userId, muteUsersIds)
          : undefined,
      )
      .orderBy(sql`RANDOM()`)
      .limit(limit)
      .all();
    return randomPosts.map((post) => post.id);
  })();

  const posts = await database()
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
    .where(inArray(schema.posts.id, randomPostIds))
    .limit(limit)
    .all();
  return shuffle(posts);
};
