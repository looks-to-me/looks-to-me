import { PostList, PostListItem } from '../../components/domains/post/post-list';
import { graphqlExecutor } from '../../graphql';
import { graphql } from '../../graphql/generated';
import { createMetadata } from '../../helpers/create-metadata';

import type { InfiniteScrollFetcher } from '../../components/elements/infinite-scroll';
import type { Metadata } from 'next';
import type { FC } from 'react';

const HomePageQuery = graphql(/** GraphQL */ `
  query HomePage($first: Int, $cursor: String) {
    posts(first: $first, after: $cursor, order: NEWEST) {
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

const fetchPosts = async (cursor?: string) => {
  'use server';
  const data = await graphqlExecutor({
    document: HomePageQuery,
    variables: {
      first: 32,
      cursor,
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
  title: {
    absolute: 'LooksToMe',
  },
});

export type HomePageProps = PageProps<'/'>;

const HomePage: FC<HomePageProps> = async () => {
  const posts = await fetchPosts();

  const fetcher: InfiniteScrollFetcher = async ({ cursor }) => {
    'use server';
    return await fetchPosts(cursor);
  };

  return (
    <PostList
      posts={posts}
      fetcher={fetcher}
    />
  );
};

export default HomePage;
