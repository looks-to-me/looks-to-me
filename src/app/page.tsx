import { Header } from './_components/header';

import type { FC } from 'react';
import { getServerSession } from './_libs/supabase/get-server-session';
import { SignOutButton } from './_components/sign-out-button';
import { SignInButton } from './_components/sign-in-button';

const HomePage: FC = async () => {
  const { session } = await getServerSession()

  return (
    <div>
      <Header>
        Header
      </Header>
      <main>
        <h1>LooksToMe</h1>
        {session ? (
          <div>
            <p>logged in: {JSON.stringify(session.user.user_metadata)}</p>
            <SignOutButton />
          </div>
        ) : (
          <SignInButton />
        )}
      </main>
    </div>
  );
};

export default HomePage;
