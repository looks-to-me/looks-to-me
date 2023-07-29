import { Header } from './_components/header';
import { SignInButton } from './_components/sign-in-button';
import { SignOutButton } from './_components/sign-out-button';
import { getSession } from './_libs/auth/server/get-session';

import type { FC } from 'react';

export const runtime = 'edge';

const HomePage: FC = async () => {
  const session = await getSession();

  return (
    <div>
      <Header>
        {session ? <SignOutButton /> : <SignInButton />}
      </Header>
      <main>
        MainContent
      </main>
    </div>
  );
};

export default HomePage;
