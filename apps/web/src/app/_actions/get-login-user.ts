import { findUserProviderByTypeAndSub } from '../(main)/_repositories/user-provider-repository';
import { findUserById } from '../(main)/_repositories/user-repository';
import { getUserMetadata } from '../_libs/auth/server/get-user-metadata';

export const getLoginUser = async () => {
  const userMetadata = await getUserMetadata();
  if (!userMetadata) return;
  const userProvider = await findUserProviderByTypeAndSub(userMetadata.provider, userMetadata.sub);
  if (!userProvider) return;
  return await findUserById(userProvider.userId);
};
