'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '../../../_components/button';

import type { FC } from 'react';

export const LoginButton: FC = () => {
  const path = usePathname();
  const isDisabled = path === '/login';

  return (
    <Button size="medium" disabled={isDisabled} asChild>
      {isDisabled ? (
        <button>
          Login
        </button>
      ) : (
        <Link href="/login">
          Login
        </Link>
      )}
    </Button>
  );
};
