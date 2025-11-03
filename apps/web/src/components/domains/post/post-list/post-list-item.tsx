import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import * as styles from './post-list.css';
import { getFragmentData, graphql } from '../../../../graphql/generated';
import { AspectRatio } from '../../../elements/aspect-ratio';

import type { FragmentType } from '../../../../graphql/generated';
import type { FC } from 'react';

export const PostListItemFragment = graphql(/** GraphQL */ `
  fragment PostListItem on Post {
    id
    word
    imageUrl
    author {
      id
      name
    }
  }
`);

export type PostProps = {
  className?: string | undefined;
  fragment: FragmentType<typeof PostListItemFragment>;
};

export const PostListItem: FC<PostProps> = ({
  className,
  fragment,
}) => {
  const data = getFragmentData(PostListItemFragment, fragment);

  return (
    <Link
      className={clsx(className, styles.item)}
      href={`/@${data.author.name}/posts/${data.id}`}
      prefetch={false}
    >
      <AspectRatio ratio={4 / 3}>
        <Image
          className={styles.image}
          src={data.imageUrl}
          alt={`Looks ${data.word} To Me`}
          sizes="16rem"
          fill
        />
      </AspectRatio>
    </Link>
  );
};
