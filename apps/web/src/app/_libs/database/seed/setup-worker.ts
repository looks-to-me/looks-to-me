import { Miniflare } from 'miniflare';

import { mockEnv } from '../../env';

let mf: Miniflare;
const env = { ...mockEnv };
export const setupWorker = async () => {
  const persistPath = '.wrangler/state/v3';
  mf = new Miniflare({
    script: '',
    modules: true,
    d1Persist: `${persistPath}/d1`,
    r2Persist: `${persistPath}/r2`,
    d1Databases: { DB: 'local' },
    r2Buckets: { BUCKET: 'local' },
  });

  const bindings = await mf.getBindings();

  for (const [key, value] of Object.entries(bindings)) {
    mockEnv[key] = value;
  }
};

export const cleanupWorker = async () => {
  await mf?.dispose();

  for (const key of Object.keys(env)) {
    delete mockEnv[key];
  }

  for (const [key, value] of Object.entries(env)) {
    mockEnv[key] = value;
  }
};
