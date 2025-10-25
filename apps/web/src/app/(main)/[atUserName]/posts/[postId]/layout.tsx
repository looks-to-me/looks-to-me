import * as styles from './layout.css';
import { ApplicationLayout } from '../../../../../components/domains/application/application-layout';
import { createMetadata } from '../../../../../helpers/create-metadata';
import { findPostById } from '../../../../../repositories/post-repository';
import { findUserById } from '../../../../../repositories/user-repository';
import { getUserName } from '../../_helpers/get-user-name';

import type { Metadata } from 'next';
import type { FC } from 'react';

export const generateMetadata = async ({ params }: UserPostDetailsLayoutProps): Promise<Metadata> => {
  const { atUserName, postId } = await params;
  const userName = getUserName(atUserName);
  if (!userName) return {};

  const post = await findPostById(postId);
  if (!post) return {};

  const user = await findUserById(post.userId);
  if (!user) return {};

  const title = `${user.profile.displayName ?? user.profile.name} / Looks ${post.word} To Me`;

  // TODO: Make it return the OGP image including the post image.
  return createMetadata({
    title,
  });
};

export type UserPostDetailsLayoutProps = LayoutProps<'/[atUserName]/posts/[postId]'>;

const UserPostDetailsLayout: FC<UserPostDetailsLayoutProps> = ({
  children,
  header,
  title,
  main,
}) => {
  return (
    <ApplicationLayout header={header}>
      <main className={styles.main}>
        <article className={styles.article}>
          {title}
          {main}
        </article>
        {children}
      </main>
    </ApplicationLayout>
  );
};

export default UserPostDetailsLayout;
