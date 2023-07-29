import { z } from 'zod';

export const AuthUserSchema = z.object({
  id: z.string(),
  accountName: z.string(),
  displayName: z.string(),
  avatarUrl: z.string(),
});

export type AuthUser = z.infer<typeof AuthUserSchema>;
