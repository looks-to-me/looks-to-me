import { z } from 'zod';

export const UserMetadataSchema = z.object({
  sub: z.string(),
  provider: z.string(),
  name: z.string().optional(),
  user_name: z.string(),
  avatar_url: z.string(),
});

export type UserMetadata = z.infer<typeof UserMetadataSchema>;
