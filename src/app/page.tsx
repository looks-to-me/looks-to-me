import { Header } from './_components/header';
import { LoginButton } from './_components/login-button';
import { LogoutButton } from './_components/logout-button';
import { getUser } from './_libs/auth/server/get-user';

import type { FC } from 'react';

export const runtime = 'edge';

const HomePage: FC = async () => {
  const user = await getUser();

  return (
    <div>
      <Header>
        {user ? <LogoutButton /> : <LoginButton />}
      </Header>
      <main>
        MainContent
      </main>
    </div>
  );
};

export default HomePage;
