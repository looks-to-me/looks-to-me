import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import * as styles from './draggable-tag.css';
import CloseIcon from '../../../../../icons/close.svg';
import { AccessibleIcon } from '../../../../elements/accessible-icon';
import { ButtonIcon } from '../../../../elements/button';
import { Tag } from '../../../../elements/tag';

import type { UniqueIdentifier } from '@dnd-kit/core';
import type { ComponentProps, FC } from 'react';

export type DraggableTagProps = {
  tag: UniqueIdentifier;
  tagIndex: number;
  onClickDelete: ComponentProps<'button'>['onClick'];
};

export const DraggableTag: FC<DraggableTagProps> = ({
  tag,
  tagIndex,
  onClickDelete,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: tag,
  });

  const isWord = tagIndex === 0;
  return (
    <Tag
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      variant={isWord ? 'primary' : 'normal'}
      data-is-word={isWord}
      className={styles.wrapper}
      style={{ transition, transform: CSS.Translate.toString(transform) }}
    >
      <div>{tag}</div>
      <button className={styles.deleteButton} onClick={onClickDelete}>
        <ButtonIcon>
          <AccessibleIcon label="Delete tag">
            <CloseIcon />
          </AccessibleIcon>
        </ButtonIcon>
      </button>
    </Tag>
  );
};
