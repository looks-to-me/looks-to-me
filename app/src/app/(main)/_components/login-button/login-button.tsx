import { LinkButton } from '../link-button';

import type { FC } from 'react';

export type LoginButtonProps = {
  className?: string | undefined;
};

export const LoginButton: FC<LoginButtonProps> = ({
  className,
}) => {
  return (
    <LinkButton className={className} href="/login" variant="normal" size="medium">
      Login
    </LinkButton>
  );
};
