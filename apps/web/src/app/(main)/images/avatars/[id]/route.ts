import { findUserById } from '../../../../../repositories/user-repository';

import type { NextRequest } from 'next/server';

export const runtime = 'edge';

type Context = {
  params: {
    id: string;
  };
};

export const GET = async (_: NextRequest, context: Context) => {
  const user = await findUserById(context.params.id);
  if (!user) return new Response(null, { status: 404, statusText: 'Not Found' });
  return await fetch(user.profile.avatarUrl);
};
