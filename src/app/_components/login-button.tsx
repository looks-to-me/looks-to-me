'use client';

import { signIn } from 'next-auth/react';

import type { FC, MouseEventHandler } from 'react';

export const LoginButton: FC = () => {
  const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    void signIn('github', {
      callbackUrl: 'http://localhost:3000/',
    });
  };

  return <button onClick={onClick}>ログイン</button>;
};
