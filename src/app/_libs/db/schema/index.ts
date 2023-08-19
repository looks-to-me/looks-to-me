import { postTags, postTagsRelations } from './tables/postTags';
import { imagesRelations, images } from './tables/images';
import { posts, postsRelations } from './tables/posts';
import { tags, tagsRelations } from './tables/tags';
import { users, usersRelations } from './tables/users';

export const schema = {
  users,
  usersRelations,
  posts,
  postsRelations,
  images,
  imagesRelations,
  tags,
  tagsRelations,
  postTags,
  postTagsRelations,
};
