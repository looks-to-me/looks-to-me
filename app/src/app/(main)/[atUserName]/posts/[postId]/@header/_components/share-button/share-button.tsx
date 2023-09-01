'use client';

import clsx from 'clsx';
import { useCallback } from 'react';
import { toast } from 'sonner';

import * as styles from './share-button.css';
import { Button, ButtonIcon } from '../../../../../../../_components/button';
import CopyIcon from '../../../../../../../_icons/copy.svg';

import type { Post } from '../../../../../../_repositories/post-repository';
import type { FC } from 'react';

export type ShareButtonProps = {
  className?: string | undefined;
  post: Post;
};

// TODO: plane text link, tweet link, etc.
export const ShareButton: FC<ShareButtonProps> = ({
  className,
  post,
}) => {
  const handleClick = useCallback(() => {
    void navigator.clipboard.writeText(`![LGTM](${origin}/images/posts/${post.id})`);
    toast.success('Copied!');
  }, [post.id]);

  return (
    <Button
      className={clsx(className, styles.wrapper)}
      variant="primary"
      size="medium"
      onClick={handleClick}
    >
      <ButtonIcon>
        <CopyIcon />
      </ButtonIcon>
      Copy
    </Button>
  );
};
