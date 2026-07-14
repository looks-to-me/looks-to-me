import { builder } from '../../../core/builder';

export const User = builder.simpleObject('User', {
  description: 'A user in LooksToMe',
  fields: (t) => ({
    id: t.id({ description: 'The ID of the user' }),
    name: t.string({ description: 'The name of the user' }),
    displayName: t.string({ description: 'The display name of the user', nullable: true }),
  }),
});
