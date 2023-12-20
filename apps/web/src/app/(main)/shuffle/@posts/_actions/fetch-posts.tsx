'use server';

import { eq, inArray, notInArray, sql } from 'drizzle-orm';

import { findMuteUsersByUserId } from '../../../../../repositories/mute-user-repository';
import { database } from '../../../../_libs/database';
import { schema } from '../../../../_libs/database/schema';
import { Post } from '../../../_components/post';

import type { InfiniteScrollEdge } from '../../../../../components/elements/infinite-scroll';

// Fisher–Yates shuffle
const shuffle = <T extends object>(array: Array<T>): Array<T> => {
  return array.reduce((previous, current, index) => {
    const key = Math.floor(Math.random() * (index + 1));
    previous[index] = previous[key]!;
    previous[key] = current;
    return previous;
  }, [] as Array<T>);
};

const limit = 32;

export const fetchPosts = async (loginUserId?: string | undefined): Promise<InfiniteScrollEdge[]> => {
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
    .innerJoin(schema.userProfiles, eq(schema.userProfiles.userId, schema.users.id))
    .where(inArray(schema.posts.id, randomPostIds))
    .limit(limit)
    .all();

  return shuffle(posts).map(post => ({
    cursor: post.postedAt.toISOString(),
    node: (
      <Post
        key={post.id}
        post={{
          id: post.id,
          word: post.word,
          image: `/images/posts/${post.id}`,
          link: `/@${post.user.name}/posts/${post.id}`,
        }}
      />
    ),
  }));
};
