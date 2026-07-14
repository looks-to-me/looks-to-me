import { builder } from './builder';

export const Error = builder.interfaceType('Error', {
  description: 'Generic error interface',
  fields: (t) => ({
    message: t.exposeString('message', { description: 'Error message' }),
  }),
});
