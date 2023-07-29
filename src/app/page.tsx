import { Header } from './_components/header';
import { SignInButton } from './_components/sign-in-button';
import { SignOutButton } from './_components/sign-out-button';
import { getUser } from './_libs/auth/server/get-user';

import type { FC } from 'react';

export const runtime = 'edge';

const HomePage: FC = async () => {
  const user = await getUser();

  return (
    <div>
      <Header>
        {user ? <SignOutButton /> : <SignInButton />}
      </Header>
      <main>
        MainContent
      </main>
    </div>
  );
};

export default HomePage;
