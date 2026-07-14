import Link from 'next/link';
import { notFound } from 'next/navigation';

import * as styles from './post-details-header.css';
import { PostMenu } from '../../../../app/(main)/_components/post-menu';
import { getFragmentData, graphql } from '../../../../graphql/generated';
import { Avatar, AvatarFallback, AvatarImage } from '../../../elements/avatar';
import { PostShareButton } from '../post-share-button';

import type { FragmentType } from '../../../../graphql/generated';
import type { FC } from 'react';

export const PostDetailsHeaderFragment = graphql(/** GraphQL */ `
  fragment PostDetailsHeader on Query {
    me {
      id
    }
    post(id: $id) {
      id
      word
      ...PostShareButton
      author {
        id
        name
        displayName
      }
    }
  }
`);

export type PostDetailsHeaderProps = {
  fragment: FragmentType<typeof PostDetailsHeaderFragment>;
};

export const PostDetailsHeader: FC<PostDetailsHeaderProps> = ({
  fragment,
}) => {
  const data = getFragmentData(PostDetailsHeaderFragment, fragment);
  if (!data.post) notFound();

  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <Link href={`/@${data.post.author.name}`}>
          <Avatar className={styles.avatar}>
            <AvatarImage
              src={`/images/avatars/${data.post.author.id}`}
              alt={data.post.author.displayName ?? data.post.author.name}
              sizes="32px"
            />
            <AvatarFallback>
              {data.post.author.displayName ?? data.post.author.name}
            </AvatarFallback>
          </Avatar>
        </Link>
        <h2 className={styles.title}>
          Looks {data.post.word} To Me
        </h2>
      </div>
      <div className={styles.toolbar}>
        <PostShareButton fragment={data.post} />
        {data.me?.id === data.post.author.id && (
          <PostMenu
            postUser={postUser}
            isMuteUser={isMuteUser}
            loginUser={loginUser}
            post={post}
          />
        )}
      </div>
    </header>
  );
};
