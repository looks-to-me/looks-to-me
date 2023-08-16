import { Header } from './_components/header';

import type { FC } from 'react';

export const runtime = 'edge';

const HomePage: FC = () => {
  return (
    <div>
      <Header>
        Home
      </Header>
      <main>
        MainContent
      </main>
    </div>
  );
};

export default HomePage;
