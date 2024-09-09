import * as v from 'valibot';

export const UserMetadataSchema = v.object({
  sub: v.string(),
  provider: v.string(),
  name: v.optional(v.string()),
  user_name: v.string(),
  avatar_url: v.string(),
});

export type UserMetadata = v.InferInput<typeof UserMetadataSchema>;
