import { builder } from './core/builder';

import './resolvers/posts';
import './resolvers/users';

export const createSchema = (...args: Parameters<typeof builder.toSchema>) => builder.toSchema(...args);
