import { setupDatabase } from '@looks-to-me/package-database-testing/setup' with { type: 'macro' };
import { resultMatchers } from '@praha/byethrow-testing';
import { afterAll, expect, vi } from 'vitest';

import type { ResultMatchers } from '@praha/byethrow-testing';

declare module 'vitest' {
  interface Matchers<T> extends ResultMatchers<T> {}
}

expect.extend(resultMatchers);

const miniflare = await vi.hoisted(async () => {
  const { Miniflare } = await import('miniflare');
  return new Miniflare({
    script: '',
    modules: true,
    d1Databases: ['DB'],
  });
});

const database = await vi.hoisted(async () => {
  const { createDatabase } = await import('@looks-to-me/package-database');
  return createDatabase(await miniflare.getD1Database('DB'));
});

setupDatabase(database);

afterAll(async () => {
  await miniflare?.dispose();
});
