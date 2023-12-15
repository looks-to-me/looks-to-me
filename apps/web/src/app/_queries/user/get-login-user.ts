import { findUserProviderByTypeAndSub } from '../../(main)/_repositories/user-provider-repository';
import { findUserById } from '../../(main)/_repositories/user-repository';
import { getUserMetadata } from '../../_libs/auth/server/get-user-metadata';

import type { User } from '../../(main)/_repositories/user-repository';

/**
 * Get the user data of the currently logged-in user.
 * No cache is used to ensure that the latest data is always retrieved.
 */
export const getLoginUser = async (): Promise<User | undefined> => {
  const userMetadata = await getUserMetadata();
  if (!userMetadata) return;
  const userProvider = await findUserProviderByTypeAndSub(userMetadata.provider, userMetadata.sub);
  if (!userProvider) return;
  return await findUserById(userProvider.userId);
};
