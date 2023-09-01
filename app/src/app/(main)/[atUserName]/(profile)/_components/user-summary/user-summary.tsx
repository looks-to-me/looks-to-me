import clsx from 'clsx';
import Image from 'next/image';

import * as styles from './user-summary.css';

import type { FC } from 'react';

export type UserSummaryProps = {
  name: string;
  avatarUrl: string;
  numOfPosts: number;
  githubUrl?: string;
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
        className={styles.image}
        width={60}
        height={60}
        src={avatarUrl} alt={name}
      />
      <div className={styles.main}>
        <p className={styles.name}>{name}</p>
        <div className={styles.lower}>
          <p className={styles.numOfPosts}>{`${numOfPosts} posts`}</p>
          {githubUrl && (
            <a href={githubUrl} target="_blank">
            GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
