import { database } from '@looks-to-me/package-database';
import { composeFactory } from '@praha/drizzle-factory';

import { imagesFactory } from './factories/images-factory';
import { muteUsersFactory } from './factories/mute-users-factory';
import { postCopiesFactory } from './factories/post-copies-factory';
import { postTagsFactory } from './factories/post-tags-factory';
import { postsFactory } from './factories/posts-factory';
import { tagsFactory } from './factories/tags-factory';
import { userProfilesFactory } from './factories/user-profiles-factory';
import { userProvidersFactory } from './factories/user-providers-factory';
import { usersFactory } from './factories/users-factory';

export const databaseFactory = composeFactory({
  images: imagesFactory,
  muteUsers: muteUsersFactory,
  postCopies: postCopiesFactory,
  postTags: postTagsFactory,
  posts: postsFactory,
  tags: tagsFactory,
  userProfiles: userProfilesFactory,
  userProviders: userProvidersFactory,
  users: usersFactory,
})(database);
