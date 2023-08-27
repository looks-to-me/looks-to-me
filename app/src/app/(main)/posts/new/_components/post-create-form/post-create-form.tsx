'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { toast } from 'sonner';

import { submitPost } from './actions/submit-post';
import * as styles from './post-create-form.css';
import { Button } from '../../../../../_components/button';
import { InputImageWithPreview } from '../input-image-with-preview';
import { VariableTextInput } from '../variable-text-input';

import type { FC } from 'react';

export type PostCreateFormProps = {
  className?: string | undefined;
};

export const PostCreateForm: FC<PostCreateFormProps> = ({
  className,
}) => {
  const router = useRouter();

  const handleSubmit = useCallback((formData: FormData): void => {
    toast.promise(async () => {
      const result = await submitPost(formData);
      if (result.type === 'error') {
        if (result.reason === 'unauthorized') router.push('/login');
        throw result.message;
      }
      return result.message;
    }, {
      loading: 'Submitting...',
      success: (result: string) => result,
      error: (error: string) => error,
    });
  }, [router]);

  return (
    <div className={clsx(className, styles.wrapper)}>
      <form action={handleSubmit} >
        <InputImageWithPreview name='image' />
        <div className={styles.footer}>
          <div>
            Looks <VariableTextInput className={styles.word} name='word' placeholder="Good" defaultValue="Good" /> To Me
          </div>
          <Button type='submit' variant='primary' className={styles.submit} >Submit</Button>
        </div>
      </form>
    </div>
  );
};
