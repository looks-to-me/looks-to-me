import * as v from 'valibot';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deserialize = <T>(cursor: string, schema: v.BaseSchema<unknown, T, any>): T => {
  return v.parse(schema, JSON.parse(Buffer.from(cursor, 'base64').toString('utf8')));
};
