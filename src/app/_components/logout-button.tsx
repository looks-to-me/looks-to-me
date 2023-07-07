'use client';

import { signOut } from 'next-auth/react';

import type { FC, MouseEventHandler } from 'react';

export const LogoutButton: FC = () => {
  const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    void signOut({
      callbackUrl: 'http://localhost:3000/',
    });
  };

  return <button onClick={onClick}>ログアウト</button>;
};
