import { Miniflare } from 'miniflare';
import { afterAll, beforeAll } from 'vitest';

import { mockEnv } from '../env';

export const setupWorker = () => {
  let mf: Miniflare;
  const env = { ...mockEnv };

  beforeAll(async () => {
    mf = new Miniflare({
      script: '',
      modules: true,
      r2Buckets: ['BUCKET'],
      d1Databases: ['DB'],
      serviceBindings: {
        OVERLAY: () => new Response(),
      },
    });

    const bindings = await mf.getBindings();

    for (const [key, value] of Object.entries(bindings)) {
      mockEnv[key] = value;
    }
  });

  afterAll(async () => {
    await mf?.dispose();

    for (const key of Object.keys(env)) {
      delete mockEnv[key];
    }

    for (const [key, value] of Object.entries(env)) {
      mockEnv[key] = value;
    }
  });
};
