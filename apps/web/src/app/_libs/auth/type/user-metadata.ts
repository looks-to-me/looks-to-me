import { object, optional, string } from 'valibot';

import type { Input } from 'valibot';

export const UserMetadataSchema = object({
  sub: string(),
  provider: string(),
  name: optional(string()),
  user_name: string(),
  avatar_url: string(),
});

export type UserMetadata = Input<typeof UserMetadataSchema>;
