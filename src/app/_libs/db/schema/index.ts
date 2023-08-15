import { imagesRelations, images } from './tables/images';
import { posts, postsRelations } from './tables/posts';
import { users, usersRelations } from './tables/users';

export const schema = {
  users,
  usersRelations,
  posts,
  postsRelations,
  images,
  imagesRelations,
};
