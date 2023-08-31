import clsx from 'clsx';
import Image from 'next/image';

import * as styles from './user-summary.css';

import type { FC } from 'react';

export type UserSummaryProps = {
  name: string;
  avatarUrl: string;
  numOfPosts: number;
  githubUrl: string;
};

export const UserSummary: FC<UserSummaryProps> = ({
  name,
  avatarUrl,
  numOfPosts,
  githubUrl,
}) => {
  return (
    <div className={clsx(styles.wrapper)}>
      <Image
        className={clsx(styles.image)}
        width={60}
        height={60}
        src={avatarUrl} alt={name}
      />
      <div className={clsx(styles.main)}>
        <p className={clsx(styles.name)}>{name}</p>
        <div className={clsx(styles.lower)}>
          <p className={clsx(styles.numOfPosts)}>{`${numOfPosts} posts`}</p>
          <a href={githubUrl} target="_blank">
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};
