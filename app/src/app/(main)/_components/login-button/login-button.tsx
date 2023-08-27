import Link from 'next/link';

import { Button } from '../../../_components/button';

import type { FC } from 'react';

export const LoginButton: FC = () => {
  return (
    <Button size="medium" asChild>
      <Link href="/login">
        Login
      </Link>
    </Button>
  );
};
