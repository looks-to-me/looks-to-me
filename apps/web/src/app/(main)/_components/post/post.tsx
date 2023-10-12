import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import * as styles from './post.css';
import { AspectRatio } from '../../../_components/aspect-ratio';

import type { Route } from 'next';
import type { FC } from 'react';

export type PostProps = {
  className?: string | undefined;
  post: {
    id: string;
    image: string;
    word: string;
    link: Route<`/@${string}/posts/${string}`>;
  };
};

export const Post: FC<PostProps> = ({
  className,
  post,
}) => {
  return (
    <Link className={clsx(className, styles.wrapper)} href={post.link} prefetch={false}>
      <AspectRatio ratio={4 / 3}>
        <Image
          className={styles.image}
          src={post.image}
          alt={`Looks ${post.word} To Me`}
          sizes="16rem"
          fill
        />
      </AspectRatio>
    </Link>
  );
};
