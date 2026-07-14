import { builder } from '../core/builder';

export const File = builder.scalarType('File', {
  serialize: () => {
    throw new Error('Uploads can only be used as input types');
  },
});
