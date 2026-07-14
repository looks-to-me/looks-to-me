import { clsx } from 'clsx';

import { UserMuteListItem } from './user-mute-list-item';
import * as styles from './user-mute-list.css';
import { getFragmentData, graphql } from '../../../../graphql/generated';

import type { FragmentType } from '../../../../graphql/generated';
import type { ComponentProps, FC } from 'react';

export const UserMuteListFragment = graphql(/** GraphQL */ `
  fragment UserMuteListFragment on Query {
    mutedUsers {
      id
      ...UserMuteListItemFragment
    }
  }
`);

export type UserMuteListProps = ComponentProps<'ul'> & {
  fragment: FragmentType<typeof UserMuteListFragment>;
};

export const UserMuteList: FC<UserMuteListProps> = ({
  className,
  fragment,
}) => {
  const data = getFragmentData(UserMuteListFragment, fragment);

  if (!data.mutedUsers.length) {
    return (
      <div className={clsx(className, styles.wrapper, styles.empty)}>
        You haven&apos;t muted anyone yet.
      </div>
    );
  }

  return (
    <ul className={clsx(className, styles.wrapper)}>
      {data.mutedUsers.map((user) => (
        <UserMuteListItem key={user.id} fragment={user} />
      ))}
    </ul>
  );
};
