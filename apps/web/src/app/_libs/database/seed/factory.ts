import { faker } from '@faker-js/faker';
import { createId } from '@paralleldrive/cuid2';

import { saveImage } from '../../../(main)/_repositories/image-repository';
import { savePost } from '../../../(main)/_repositories/post-repository';
import { saveUserProvider } from '../../../(main)/_repositories/user-provider-repository';
import { saveUser } from '../../../(main)/_repositories/user-repository';

export const createSeedUser = async () => {
  const user = await saveUser({
    id: createId(),
    profile: {
      displayName: faker.internet.displayName(), 
      name: faker.internet.userName(), 
      avatarUrl: faker.internet.avatar(), 
    },
  });
  const userProvider = await saveUserProvider({
    sub: faker.string.uuid(),
    type: 'github',
    userId: user.id,
  });
  return [user, userProvider] as const;
};

export const createSeedImage = async ({ userId }: { userId: string }) => {
  return await saveImage({
    id: createId(),
    userId,
    width: 100,
    height: 100,
  });
};

export const createSeedPost = async ({ userId, imageId }: { userId: string; imageId: string }) => {
  return await savePost({
    id: createId(),
    userId,
    imageId,
    word: faker.string.uuid(), //NOTE: because of the unique constraint(post.id, post.word)
  });
};
