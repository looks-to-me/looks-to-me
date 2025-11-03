'use client';

import { clsx } from 'clsx';
import { Volume2Icon } from 'lucide-react';
import Link from 'next/link';

import * as styles from './user-mute-list.css';
import { getFragmentData, graphql } from '../../../../graphql/generated';
import { useUnmuteUser } from '../../../../hooks/use-unmute-user';
import { Avatar, AvatarFallback, AvatarImage } from '../../../elements/avatar';
import { Button, ButtonIcon } from '../../../elements/button';

import type { FragmentType } from '../../../../graphql/generated';
import type { ComponentProps, FC } from 'react';

export const UserMuteListItemFragment = graphql(/** GraphQL */ `
  fragment UserMuteListItemFragment on User {
    id
    name
    displayName
    avatarUrl
  }
`);

export type UserMuteListItemProps = ComponentProps<'li'> & {
  fragment: FragmentType<typeof UserMuteListItemFragment>;
};

export const UserMuteListItem: FC<UserMuteListItemProps> = ({
  className,
  fragment,
}) => {
  const data = getFragmentData(UserMuteListItemFragment, fragment);

  const unmuteUser = useUnmuteUser({
    unmuteUserId: data.id,
    unmuteUserName: data.name,
  });

  return (
    <li className={clsx(className, styles.item)}>
      <Link
        href={`/@${data.name}`}
        className={styles.profile}
      >
        <Avatar className={styles.avatar}>
          <AvatarImage
            src={data.avatarUrl}
            alt={data.displayName ?? data.name}
            sizes="64px"
          />
          <AvatarFallback>
            {data.displayName ?? data.name}
          </AvatarFallback>
        </Avatar>
        <div className={styles.name}>
          <div className={styles.accountName}>
            {data.name}
          </div>
          <div className={styles.displayName}>
            {data.displayName}
          </div>
        </div>
      </Link>
      <Button
        className={styles.unmute}
        onClick={unmuteUser}
        size="medium"
      >
        <ButtonIcon>
          <Volume2Icon />
        </ButtonIcon>
        Unmute
      </Button>
    </li>
  );
};
