import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { toast } from 'sonner';

import { useAlertDialog } from '../../../../../../../../_components/alert-dialog/alert-dialog-provider';
import { deletePostAction } from '../actions/delete-post';

import type { Post } from '../../../../../../../_repositories/post-repository';

type Props = {
  post: Post;
};

export const useDeletePost = ({ post }: Props) => {
  const router = useRouter();
  const { openModal } = useAlertDialog();
  
  return useCallback(async () => {
    const isComfirm = await openModal({ title: 'Delete Post', description: 'Are you sure you want to delete this post?' });
    if (!isComfirm) return;

    toast.promise(async () => {
      const result = await deletePostAction(post.id);
      switch(result.type){
        case 'success': {
          router.push(result.redirectUrl);
          return result.message;
        }
        case 'error': {
          if (result.reason === 'unauthorized') router.push('/login');
          throw result.message;
        }
      }
    }, {
      loading: 'Deleting...',
      success: (result: string) => result,
      error: (error: string) => error,
    });
  },[post.id]);
};