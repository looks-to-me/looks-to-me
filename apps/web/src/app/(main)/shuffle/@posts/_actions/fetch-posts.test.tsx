import { createId } from '@paralleldrive/cuid2';

import { fetchPosts } from './fetch-posts';
import { getLoginUser } from '../../../../../queries/user/get-login-user';
import { saveImage } from '../../../../../repositories/image-repository';
import { saveMuteUser } from '../../../../../repositories/mute-user-repository';
import { savePost } from '../../../../../repositories/post-repository';
import { saveUser } from '../../../../../repositories/user-repository';
import { setupDatabase } from '../../../../_libs/test/setup-database';
import { setupWorker } from '../../../../_libs/test/setup-worker';

import type { Image } from '../../../../../repositories/image-repository';
import type { User } from '../../../../../repositories/user-repository';
import type { Post as PostComponent } from '../../../_components/post';
import type { ComponentProps, ReactElement } from 'react';

const createUser = async (user?: Partial<User>) => {
  return await saveUser({
    id: createId(),
    ...user,
    profile: {
      name: 'name',
      displayName: 'display-name',
      avatarUrl: 'avatar-url',
      ...user?.profile,
    },
  });
};

const createImage = async (user: User) => {
  return await saveImage({
    id: createId(),
    userId: user.id,
    width: 100,
    height: 100,
  });
};

const createPost = async (user: User, image: Image) => {
  return await savePost({
    id: createId(),
    userId: user.id,
    imageId: image.id,
    word: createId(),
  });
};

jest.mock('@supabase/auth-helpers-nextjs');
jest.mock('../../../../../queries/user/get-login-user');

describe('fetchPosts', () => {
  setupWorker();
  setupDatabase();

  describe('when mute user', () => {
    const userId = createId();

    beforeEach(async () => {
      const user = await createUser({ id: userId });
      const image = await createImage(user);
      await createPost(user, image);

      jest.mocked(getLoginUser).mockResolvedValue(user);
    });

    it('should user1 cannot retrieve posts from user2 if user1 have muted user2.', async () => {
      const user = await createUser();
      const image = await createImage(user);
      const post = await createPost(user, image);

      await saveMuteUser({
        userId,
        muteUserId: user.id,
      });

      const posts = await fetchPosts();
      const postElements = posts.map(
        (post) =>
          post.node as ReactElement<ComponentProps<typeof PostComponent>>,
      );
      const postIds = postElements.map((post) => post.props.post.id);

      expect(posts.length).toEqual(1);
      expect(postIds.includes(post.id)).toBeFalsy();
    });

    it('should user1 be able to get all posts if user1 has muted anyone.', async () => {
      const user = await createUser();
      const image = await createImage(user);
      await createPost(user, image);

      const posts = await fetchPosts();

      expect(posts.length).toEqual(2);
    });
  });
});
