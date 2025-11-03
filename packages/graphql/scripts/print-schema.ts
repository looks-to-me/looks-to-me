import fs from 'node:fs';

import { printSchema, lexicographicSortSchema } from 'graphql';

import { createSchema } from '../src';

const schema = lexicographicSortSchema(createSchema());

fs.writeFileSync('./schema.graphql', printSchema(schema));
