/* eslint-disable react-hooks/rules-of-hooks */

import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { createSchema } from '@looks-to-me/package-graphql';
import { createYoga } from 'graphql-yoga';

import { useAuth } from './plugins/auth';
import { useDatabase } from './plugins/database';
import { useEnv } from './plugins/env';

import type { HTTPExecutorOptions } from '@graphql-tools/executor-http';
import type { ExecutionRequest } from '@graphql-tools/utils';

import 'server-only';

const yoga = createYoga({
  schema: createSchema(),
  plugins: [
    useEnv(),
    useAuth(),
    useDatabase(),
  ],
});

const executor = buildHTTPExecutor(yoga);

// eslint-disable-next-line func-style
function assertSingleValue<TValue extends object>(
  value: TValue | AsyncIterable<TValue>,
): asserts value is TValue {
  if (Symbol.asyncIterator in value) {
    throw new Error('Expected single value');
  }
}

export const graphqlExecutor = async <
  Return = unknown,
  Args extends Record<string, unknown> = Record<string, unknown>,
  Root = unknown,
>(
  request: Omit<ExecutionRequest<Args, unknown, Root, HTTPExecutorOptions, Return>, 'extensions'>,
): Promise<Return> => {
  const result = await executor({
    ...request,
    extensions: {
      endpoint: 'http://localhost/graphql',
    },
  });
  assertSingleValue(result);

  if (result.errors?.length) {
    throw result.errors[0]!;
  }

  return result.data!;
};
