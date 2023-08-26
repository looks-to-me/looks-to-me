import { imagesRelations, images } from './tables/images';
import { posts, postsRelations } from './tables/posts';
import { userProfiles, userProfilesRelations } from './tables/user-profiles';
import { userProviders, userProvidersRelations } from './tables/user-providers';
import { users, usersRelations } from './tables/users';

export const schema = {
  userProfilesRelations,
  userProfiles,
  userProviders,
  userProvidersRelations,
  users,
  usersRelations,
  posts,
  postsRelations,
  images,
  imagesRelations,
};
