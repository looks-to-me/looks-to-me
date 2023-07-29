import { Header } from './_components/header';
import { getAuthUser } from './_libs/auth/server/get-auth-user';

import type { FC } from 'react';

export const runtime = 'edge';

const HomePage: FC = async () => {
  const authUser = await getAuthUser();

  return (
    <div>
      <Header authUser={authUser}>
        Home
      </Header>
      <main>
        MainContent
      </main>
    </div>
  );
};

export default HomePage;
