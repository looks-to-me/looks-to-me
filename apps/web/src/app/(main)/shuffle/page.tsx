import { PostList, PostListItem } from '../../../components/domains/post/post-list';
import { graphqlExecutor } from '../../../graphql';
import { graphql } from '../../../graphql/generated';
import { createMetadata } from '../../../helpers/create-metadata';

import type { Metadata } from 'next';
import type { FC } from 'react';

const ShufflePageQuery = graphql(/** GraphQL */ `
  query ShufflePage($first: Int) {
    posts(first: $first, order: RANDOM) {
      edges {
        cursor
        node {
          id
          ...PostListItem
        }
      }
    }
  }
`);

const fetchPosts = async () => {
  'use server';
  const data = await graphqlExecutor({
    document: ShufflePageQuery,
    variables: {
      first: 32,
    },
  });

  return data.posts.edges.map((edge) => ({
    cursor: edge.cursor,
    node: (
      <PostListItem
        key={edge.node.id}
        fragment={edge.node}
      />
    ),
  }));
};

export const metadata: Metadata = createMetadata({
  title: 'Shuffle',
});

export type ShufflePageProps = PageProps<'/shuffle'>;

const ShufflePage: FC<ShufflePageProps> = async () => {
  const posts = await fetchPosts();

  return (
    <PostList
      posts={posts}
      fetcher={fetchPosts}
    />
  );
};

export default ShufflePage;
