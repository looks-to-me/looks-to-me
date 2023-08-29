import { LinkButton } from '../link-button';

import type { FC } from 'react';

export type NewPostButtonProps = {
  className?: string | undefined;
};

export const NewPostButton: FC<NewPostButtonProps> = ({
  className,
}) => {
  return (
    <LinkButton className={className} href="/new" variant="primary" size="medium">
      New post
    </LinkButton>
  );
};
