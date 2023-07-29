import { Header } from './_components/header';
import { LoginButton } from './_components/login-button';
import { LogoutButton } from './_components/logout-button';
import { getAuthUser } from './_libs/auth/server/get-auth-user';

import type { FC } from 'react';

export const runtime = 'edge';

const HomePage: FC = async () => {
  const authUser = await getAuthUser();

  return (
    <div>
      <Header>
        {authUser ? <LogoutButton /> : <LoginButton />}
      </Header>
      <main>
        MainContent
      </main>
    </div>
  );
};

export default HomePage;
