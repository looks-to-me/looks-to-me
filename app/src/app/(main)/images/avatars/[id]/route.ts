import { findUserById } from '../../../_repositories/user-repository';

import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export const GET = async (_: NextRequest, { params }: { params: { id: string } }) => {
  const user = await findUserById(params.id);
  if (!user) return Response.error();
  return await fetch(user.profile.avatarUrl);
};
