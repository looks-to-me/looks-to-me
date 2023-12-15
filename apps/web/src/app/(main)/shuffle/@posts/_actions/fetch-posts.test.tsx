import { createId } from '@paralleldrive/cuid2';

import { fetchPosts } from './fetch-posts';
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

const createUser = async () => {
  return await saveUser({
    id: createId(),
    profile: {
      name: 'name',
      displayName: 'display-name',
      avatarUrl: 'avatar-url',
    },
  });
};

const createImage = async (user: User ) => {
  return await saveImage({
    id: createId(),
    userId: user.id,
    width: 100,
    height: 100,
  });
};

const createPost = async (
  user: User,
  image: Image,
) => {
  return await savePost({
    id: createId(),
    userId: user.id,
    imageId: image.id,
    word: createId(),
  });
};

describe('fetchPosts', () => {
  setupWorker();
  setupDatabase();
  describe('mute user', () => {
    it('user1 cannot retrieve posts from user2 when user1 has muted user2.', async () => {
      const user1 = await createUser();
      const image1 = await createImage(user1);
      const post1 = await createPost(user1, image1);

      const user2 = await createUser();
      const image2 = await createImage(user2);
      await createPost(user2, image2);

      await saveMuteUser({
        userId: user1.id,
        muteUserId: user2.id,
      });

      const posts = await fetchPosts({ loginUserId: user1.id });
      
      const postElements = posts.map((post) => post.node as ReactElement<ComponentProps<typeof PostComponent>>);
      const postIds = postElements.map(post=>post.props.post.id);
      expect(posts.length).toEqual(1);
      expect(postIds.includes(post1.id)).toBeTruthy();
    });
    
    it('If not muted, all posts can be retrieved.', async () => {
      const user1 = await createUser();
      const image1 = await createImage(user1);
      await createPost(user1, image1);

      const user2 = await createUser();
      const image2 = await createImage(user2);
      await createPost(user2, image2);

      const posts = await fetchPosts({ loginUserId: user1.id });
      
      expect(posts.length).toEqual(2);
    });
  });

});
