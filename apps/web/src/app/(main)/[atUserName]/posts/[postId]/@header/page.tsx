import { notFound, redirect } from 'next/navigation';

import { ApplicationHeader } from '../../../../../../components/domains/application/application-header';
import { Breadcrumbs, BreadcrumbsItem } from '../../../../../../components/elements/breadcrumbs';
import { getLoginUser } from '../../../../../../queries/user/get-login-user';
import { findPostById } from '../../../../../../repositories/post-repository';
import { findUserById } from '../../../../../../repositories/user-repository';
import { getUserName } from '../../../_helpers/get-user-name';

import type { PageProps } from '../../../../../../types/page-props';
import type { UserPostDetailsPageProps } from '../page';
import type { FC } from 'react';

export type UserPostDetailsHeaderPageProps = UserPostDetailsPageProps & PageProps<{
  params: Promise<{
    // empty
  }>;
  searchParams: Promise<{
    // empty
  }>;
}>;

const UserPostDetailsHeaderPage: FC<UserPostDetailsHeaderPageProps> = async ({
  params,
}) => {
  const { atUserName, postId } = await params;
  const loginUser = await getLoginUser();

  const userName = getUserName(atUserName);
  if (!userName) return notFound();

  const post = await findPostById(postId);
  if (!post) return notFound();

  const user = await findUserById(post.userId);
  if (!user) return notFound();

  if (user.profile.name !== userName) {
    // redirect to correct username
    return redirect(`/@${user.profile.name}/posts/${post.id}`);
  }

  return (
    <ApplicationHeader user={loginUser}>
      <Breadcrumbs>
        <BreadcrumbsItem href={`/@${user.profile.name}`}>
          {user.profile.displayName ?? user.profile.name}
        </BreadcrumbsItem>
        <BreadcrumbsItem href={`/@${user.profile.name}/posts/${post.id}`}>
          Looks {post.word} To Me
        </BreadcrumbsItem>
      </Breadcrumbs>
    </ApplicationHeader>
  );
};

export default UserPostDetailsHeaderPage;
