import { SessionState } from './_components/session-state';

import type { FC } from 'react';

const HomePage: FC = () => {
  return (
    <main>
      <h1>LooksToMe</h1>
      <SessionState />
    </main>
  );
};

export default HomePage;
