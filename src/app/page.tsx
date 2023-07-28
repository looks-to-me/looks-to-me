import { Header } from './_components/header';
import { SignInButton } from './_components/sign-in-button';
import { SignOutButton } from './_components/sign-out-button';
import { getServerSession } from './_libs/supabase/get-server-session';

import type { FC } from 'react';

const HomePage: FC = async () => {
  const { session } = await getServerSession();

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

export const runtime = 'edge';
