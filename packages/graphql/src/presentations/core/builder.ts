import SchemaBuilder from '@pothos/core';
import RelayPlugin from '@pothos/plugin-relay';
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects';

import type { Scalars } from './scalars';

type Interfaces = {
  Error: {
    kind: string;
    message: string;
  };
};

export const builder = new SchemaBuilder<{
  DefaultFieldNullability: false;
  DefaultInputFieldRequiredness: true;
  DefaultEdgesNullability: false;
  Scalars: Scalars;
  Interfaces: Interfaces;
}>({
  defaultFieldNullability: false,
  defaultInputFieldRequiredness: true,
  plugins: [
    RelayPlugin,
    SimpleObjectsPlugin,
  ],
  relay: {
    cursorType: 'String',
    edgesFieldOptions: {
      nullable: false,
    },
  },
});

builder.queryType();
builder.mutationType();
