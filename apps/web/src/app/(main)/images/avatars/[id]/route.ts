import { findUserById } from '../../../../../repositories/user-repository';

import type { NextRequest } from 'next/server';

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export const GET = async (_: NextRequest, context: Context) => {
  const { id } = await context.params;
  const user = await findUserById(id);
  if (!user) return new Response(null, { status: 404, statusText: 'Not Found' });
  return await fetch(user.profile.avatarUrl);
};
