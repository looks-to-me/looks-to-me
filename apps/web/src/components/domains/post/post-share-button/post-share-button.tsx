'use client';

import { CopyIcon } from 'lucide-react';
import { useCallback } from 'react';
import { toast } from 'sonner';

import { publicEnv } from '../../../../app/_libs/env';
import { getFragmentData, graphql } from '../../../../graphql/generated';
import { Button, ButtonIcon } from '../../../elements/button';

import type { FragmentType } from '../../../../graphql/generated';
import type { ButtonProps } from '../../../elements/button';
import type { FC } from 'react';

export const PostShareButtonFragment = graphql(/** GraphQL */ `
  fragment PostShareButton on Post {
    id
    word
  }
`);

export type ShareButtonProps = Omit<ButtonProps, 'variant' | 'size' | 'children'> & {
  fragment: FragmentType<typeof PostShareButtonFragment>;
};

export const PostShareButton: FC<ShareButtonProps> = ({
  className,
  fragment,
}) => {
  const data = getFragmentData(PostShareButtonFragment, fragment);

  const handleClick = useCallback(() => {
    void navigator.clipboard.writeText(`![L${data.word.toUpperCase().at(0)}TM](${publicEnv().NEXT_PUBLIC_APP_ORIGIN}/images/posts/${data.id})`);
    toast.success('Copied!');
  }, [data]);

  return (
    <Button
      className={className}
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
