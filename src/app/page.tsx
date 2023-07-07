import { Suspense, type FC } from 'react';

import { SessionStatus } from './_components/session-status';

const HomePage: FC = () => {
  return (
    <main>
      <h1>LooksToMe</h1>
      <Suspense fallback={<span>セッション情報を確認中</span>}><SessionStatus /></Suspense>
    </main>
  );
};

export default HomePage;
