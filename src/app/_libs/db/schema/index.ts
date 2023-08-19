import { imageTags, imageTagsRelations } from './tables/imageTags';
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
  imageTags,
  imageTagsRelations,
};
