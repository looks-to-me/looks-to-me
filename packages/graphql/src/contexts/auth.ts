import { createContext } from '@praha/diva';

export type Auth = {
  userId: string | undefined;
};

export const [
  auth,
  withAuth,
] = createContext<Auth>();
