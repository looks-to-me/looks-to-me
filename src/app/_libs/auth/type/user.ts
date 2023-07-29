import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  accountName: z.string(),
  displayName: z.string(),
  avatarUrl: z.string(),
});

export type User = z.infer<typeof UserSchema>;
