'use client';

import clsx from 'clsx';
import { toast } from 'sonner';

import { submitPost } from './actions/submitPost';
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

  const onSubmit = async (formData: FormData): Promise<void> => {
    await submitPost(formData);
    toast.success('Post created!');
  };

  return (
    <div className={clsx(className, styles.wrapper)}>
      <form action={onSubmit} >
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
