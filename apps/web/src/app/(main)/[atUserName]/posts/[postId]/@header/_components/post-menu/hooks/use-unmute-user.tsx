import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { toast } from 'sonner';

import { useAlertDialog } from '../../../../../../../../_components/alert-dialog';
import { Button } from '../../../../../../../../_components/button';
import { unmuteUser } from '../actions/unmute-user';

import type { Post } from '../../../../../../../_repositories/post-repository';
import type { User } from '../../../../../../../_repositories/user-repository';

type Props = {
  post: Post;
  userToUnmute: User;
};

export const useUnmuteUser = ({ post, userToUnmute }: Props) => {
  const router = useRouter();
  const { openAlertDialog } = useAlertDialog();

  const confirm = useCallback(async () => {
    return await openAlertDialog({
      title: 'Unmute User',
      description: `Are you sure you want to unmute @${userToUnmute.profile.name}?`,
      acceptButton: <Button variant="primary">OK</Button>,
      rejectButton: <Button>Cancel</Button>,
    });
  }, [openAlertDialog, userToUnmute]);

  const unmute = useCallback(async () => {
    const result = await unmuteUser({ unmuteUserId: post.userId });
    switch (result.type) {
      case 'success': {
        router.refresh();
        return result.message;
      }
      case 'error': {
        if (result.reason === 'unauthorized') router.push('/login');
        throw result.message;
      }
    }
  }, [router, post]);

  return useCallback(async () => {
    const isComfirm = await confirm();
    if (!isComfirm) return;

    toast.promise(unmute, {
      loading: 'Muting...',
      success: (result: string) => result,
      error: (error: string) => error,
    });
  }, [unmute, confirm]);
};
