import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ShareButton } from './_components/share-button';
import * as styles from './page.css';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../../_components/avatar';
import { findPostById } from '../../../../_repositories/post-repository';
import { findUserById } from '../../../../_repositories/user-repository';

import type { PageProps } from '../../../../../_types/page-props';
import type { UserPostDetailsPageProps } from '../page';
import type { FC } from 'react';

export const runtime = 'edge';

export type UserPostDetailsHeaderPageProps = UserPostDetailsPageProps & PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const UserPostDetailsHeaderPage: FC<UserPostDetailsHeaderPageProps> = async ({
  params,
}) => {
  const post = await findPostById(params.postId);
  if (!post) return notFound();

  const user = await findUserById(post.userId);
  if (!user) return notFound();

  return (
    <header className={styles.wrapper}>
      <Link href={`/@${user.profile.name}`}>
        <Avatar className={styles.avatar}>
          <AvatarImage
            src={`/images/avatars/${user.id}`}
            alt={user.profile.displayName ?? user.profile.name}
            sizes="32px"
          />
          <AvatarFallback>
            {user.profile.displayName ?? user.profile.name}
          </AvatarFallback>
        </Avatar>
      </Link>
      <h2 className={styles.title}>
        Looks {post.word} To Me
      </h2>
      <div className={styles.toolbar}>
        <ShareButton post={post} />
      </div>
    </header>
  );
};

export default UserPostDetailsHeaderPage;
