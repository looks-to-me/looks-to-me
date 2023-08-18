import clsx from 'clsx';
import Image from 'next/image';

import * as styles from './post.css';
import { AspectRatio } from '../../../../../_components/aspect-ratio';

import type { FC } from 'react';

export type PostProps = {
  className?: string | undefined;
  post: {
    id: string;
    image: string;
    word: string;
  };
};

export const Post: FC<PostProps> = ({
  className,
  post,
}) => {
  return (
    // TODO: Add a link to the post details page
    <div className={clsx(className, styles.wrapper)}>
      <AspectRatio ratio={4 / 3}>
        <Image
          className={styles.image}
          src={post.image}
          alt={`Looks ${post.word} To Me`}
          sizes="16rem"
          fill
        />
      </AspectRatio>
    </div>
  );
};
