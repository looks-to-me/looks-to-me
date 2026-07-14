/* eslint-disable @typescript-eslint/no-unsafe-return */

import { withEnv } from '@looks-to-me/package-graphql';

import { privateEnv, publicEnv } from '../../../app/_libs/env';

import type { Plugin } from '@envelop/core';
import type { Env } from '@looks-to-me/package-graphql';

export const useEnv = (): Plugin => ({
  onExecute: ({ executeFn, setExecuteFn }) => {
    setExecuteFn(async (arguments_) => {
      const context: Env = {
        APP_ORIGIN: publicEnv().NEXT_PUBLIC_APP_ORIGIN,
        BUCKET: privateEnv().BUCKET,
      };

      return withEnv(context, async () => {
        return await executeFn(arguments_);
      });
    });
  },
});
