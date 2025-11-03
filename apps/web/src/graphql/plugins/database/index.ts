/* eslint-disable @typescript-eslint/no-unsafe-return */

import { createDatabase, withDatabase } from '@looks-to-me/package-database';
import { getCloudflareContext } from '@opennextjs/cloudflare';

import type { Plugin } from '@envelop/core';

export const useDatabase = (): Plugin => ({
  onExecute: ({ executeFn, setExecuteFn }) => {
    setExecuteFn(async (arguments_) => {
      const { env } = getCloudflareContext();

      return withDatabase(createDatabase(env.DB), async () => {
        return await executeFn(arguments_);
      });
    });
  },
});
