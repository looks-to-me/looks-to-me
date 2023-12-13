import { Post } from '../../../../app/(main)/_components/post';

export type PostWithUser = {
  id: string;
  word: string;
  postedAt: Date;
  user: {
    name: string;
  };
};

export const getInfinityScrollPropsByPosts = (posts: PostWithUser[]) => {
  return posts.map(post => ({
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
