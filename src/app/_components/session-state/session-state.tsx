'use client';

import { useClerk, useUser } from '@clerk/nextjs';
import clsx from 'clsx';

import { hStack, vStack } from './session-state.css';
import { SignInButton } from '../sign-in-button';
import { SignOutButton } from '../sign-out-button';
import { SignUpButton } from '../sign-up-button';

import type { FC } from 'react';

export type SessionStateProps = {
  className?: string | undefined;
};

/**
 * 動作確認のための仮のコンポーネント
 */
export const SessionState: FC<SessionStateProps> = ({ className }) => {
  const { loaded } = useClerk();
  const { user, isSignedIn } = useUser();

  return !loaded ? (
    <p>loading</p>
  ) : isSignedIn ? (
    <div className={clsx(className, vStack)}>
      <p>Signed In: {user.fullName}</p>
      <SignOutButton />
    </div>
  ) : (
    <div className={clsx(className, vStack)}>
      <p>Signed Out</p>
      <div className={hStack}>
        <SignInButton />
        <p>or</p>
        <SignUpButton />
      </div>
    </div>
  );
};
