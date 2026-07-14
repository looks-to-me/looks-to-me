import { createContext } from '@praha/diva';

export type Env = {
  APP_ORIGIN: string;
  BUCKET: R2Bucket;
};

export const [
  env,
  withEnv,
] = createContext<Env>();
