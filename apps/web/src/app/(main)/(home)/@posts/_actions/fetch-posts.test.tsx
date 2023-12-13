import { createId } from '@paralleldrive/cuid2';

import { fetchPosts } from './fetch-posts';
import { setupDatabase } from '../../../../_libs/test/setup-database';
import { setupWorker } from '../../../../_libs/test/setup-worker';
import { saveImage } from '../../../_repositories/image-repository';
import { insertMuteUser } from '../../../_repositories/mute-user-repository';
import { savePost } from '../../../_repositories/post-repository';
import { saveUser } from '../../../_repositories/user-repository';

import type { Image } from '../../../_repositories/image-repository';
import type { Post } from '../../../_repositories/post-repository';
import type { User } from '../../../_repositories/user-repository';

const setupUsersAndImagesAndPosts = async () => {
  const user1: User = {
    id: createId(),
    profile: {
      name: 'user1-name',
      displayName: 'user1-display-name',
      avatarUrl: 'user1-avatar-url',
    },
  };
  const user2: User = {
    id: createId(),
    profile: {
      name: 'user2-name',
      displayName: 'user2-display-name',
      avatarUrl: 'user2-avatar-url',
    },
  };
  await Promise.all([saveUser(user1), saveUser(user2)]);

  const imageByPostedByUser1: Image = {
    id: createId(),
    userId: user1.id,
    width: 100,
    height: 100,
  };
  const imageByPostedByUser2: Image = {
    id: createId(),
    userId: user2.id,
    width: 100,
    height: 100,
  };
  await Promise.all([
    saveImage(imageByPostedByUser1),
    saveImage(imageByPostedByUser2),
  ]);

  const postByUser1: Post = {
    id: createId(),
    userId: user1.id,
    imageId: imageByPostedByUser1.id,
    word: 'word',
  };
  const postByUser2: Post = {
    id: createId(),
    userId: user2.id,
    imageId: imageByPostedByUser2.id,
    word: 'word',
  };
  await Promise.all([savePost(postByUser1), savePost(postByUser2)]);
  return { user1, user2 };
};
describe('fetchPosts', () => {
  setupWorker();
  setupDatabase();

  describe('mute user', () => {
    it('user1 cannot retrieve posts from user2 when user1 has muted user2.', async () => {
      const { user1, user2 } = await setupUsersAndImagesAndPosts();
      await insertMuteUser({
        userId: user1.id,
        muteUserId: user2.id,
      });

      const posts = await fetchPosts({ loginUserId: user1.id });

      expect(posts.length).toEqual(1);
      expect(posts[0]?.user.name).toEqual(user1.profile.name);
    });

    it('If not muted, all posts can be retrieved.', async () => {
      const { user1 } = await setupUsersAndImagesAndPosts();

      const posts = await fetchPosts({ loginUserId: user1.id });

      expect(posts.length).toEqual(2);
    });
  });
});
