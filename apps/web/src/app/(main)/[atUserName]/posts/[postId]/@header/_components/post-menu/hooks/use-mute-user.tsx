import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { toast } from 'sonner';

import { useAlertDialog } from '../../../../../../../../_components/alert-dialog';
import { Button } from '../../../../../../../../_components/button';
import { muteUser } from '../actions/mute-user';

import type { Post } from '../../../../../../../_repositories/post-repository';
import type { User } from '../../../../../../../_repositories/user-repository';

type Props = {
  post: Post;
  userToMute: User;
};

export const useMuteUser = ({ post, userToMute }: Props) => {
  const router = useRouter();
  const { openAlertDialog } = useAlertDialog();

  const confirm = useCallback(async () => {
    return await openAlertDialog({
      title: 'Mute User',
      description: `Are you sure you want to mute @${userToMute.profile.name}?`,
      acceptButton: <Button variant="danger">OK</Button>,
      rejectButton: <Button>Cancel</Button>,
    });
  }, [openAlertDialog, userToMute]);

  const mute = useCallback(async () => {
    const result = await muteUser({ muteUserId: post.userId });
    switch (result.type) {
      case 'success': {
        router.refresh();
        return result.message;
      }
      case 'error': {
        if (result.reason === 'unauthorized') router.push('/login');
        if (result.reason === 'badRequest') {
          router.push('/login');
        }
        throw result.message;
      }
    }
  }, [post, router]);

  return useCallback(async () => {
    const isComfirm = await confirm();
    if (!isComfirm) return;

    toast.promise(mute, {
      loading: 'Muting...',
      success: (result: string) => result,
      error: (error: string) => error,
    });
  }, [confirm, mute]);
};
