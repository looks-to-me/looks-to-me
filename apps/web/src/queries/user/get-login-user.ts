import { getUserMetadata } from '../../app/_libs/auth/server/get-user-metadata';
import { findUserProviderByTypeAndSub } from '../../repositories/user-provider-repository';
import { findUserById } from '../../repositories/user-repository';

export type LoginUser = {
  id: string;
  profile: {
    name: string;
    displayName: string | null;
    avatarUrl: string;
  };
};

/**
 * Get the user data of the currently logged-in user.
 * No cache is used to ensure that the latest data is always retrieved.
 */
export const getLoginUser = async (): Promise<LoginUser | undefined> => {
  const userMetadata = await getUserMetadata();
  if (!userMetadata) return;
  const userProvider = await findUserProviderByTypeAndSub(userMetadata.provider, userMetadata.sub);
  if (!userProvider) return;
  return await findUserById(userProvider.userId);
};
