'use clinet';
import {
  DndContext,
  useDroppable,
  useSensors,
  MouseSensor,
  useSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { clsx } from 'clsx';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import * as styles from './draggable-input-tags.css';
import { DraggableTag } from './draggable-tag/draggable-tag';
import { VariableTextInput } from '../../../../app/(main)/new/_components/variable-text-input';

import type { DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';
import type {
  ChangeEvent,
  Dispatch,
  FC,
  KeyboardEvent,
  MouseEventHandler,
  SetStateAction,
} from 'react';

export type InputTagsProps = {
  className?: string | undefined;
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
};

export const DraggableInputTags: FC<InputTagsProps> = ({
  className,
  tags,
  setTags,
}) => {
  const word = tags[0] ?? '';
  const [newTag, setNewTag] = useState('');
  const { setNodeRef, node } = useDroppable({ id: '1' });

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setNewTag(event.target.value);
  }, []);

  const moveTags = (draggedTagName: string, droppedTagName: string) => {
    setTags((previous) => {
      const draggedTagIndex = previous.indexOf(draggedTagName);
      const droppedTagIndex = previous.indexOf(droppedTagName);
      const newTags = [...previous];
      newTags.splice(draggedTagIndex, 1);
      newTags.splice(droppedTagIndex, 0, draggedTagName);
      return newTags;
    });
  };

  const onDragEnd = (event: DragEndEvent) => {
    const draggedTagName = event.active.id;
    const droppedTagName = event.over?.id;
    if (typeof droppedTagName !== 'string') return;
    if (typeof draggedTagName !== 'string') return;
    moveTags(draggedTagName, droppedTagName);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();

    if (newTag === '') return;
    setTags((previous) => {
      if (previous.includes(newTag)) {
        toast.error('Already registered tags.');
        return previous;
      }
      setNewTag('');
      return [...previous, newTag];
    });

    queueMicrotask(() => {
      if (!node.current) return;
      node.current.scrollTo({
        behavior: 'smooth',
        left: node.current.scrollWidth,
      });
    });
  };

  // NOTE: This is a description to prevent the onMouseOver event from firing unless at least 1px is dragged.
  // Without this description, the onClick event in the Tag component will not fire because the onMouseOver event is fired first when clicked.
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 1 } }),
  );

  const onClickDelete = useCallback(
    (tag: UniqueIdentifier): MouseEventHandler<HTMLButtonElement> => {
      return (event) =>
        setTags((previous) => {
          event.preventDefault();
          return previous.filter((previousTag) => previousTag !== tag);
        });
    },
    [setTags],
  );
  return (
    <DndContext onDragEnd={onDragEnd} sensors={sensors}>
      <SortableContext items={tags} strategy={horizontalListSortingStrategy}>
        <div ref={setNodeRef} className={clsx(styles.wrapper, className)}>
          {tags.map((tag, index) => (
            <DraggableTag
              key={tag}
              tag={tag}
              tagIndex={index}
              onClickDelete={onClickDelete(tag)}
            />
          ))}
          <VariableTextInput
            placeholder={word ? '🏷️...' : '📝...'}
            onKeyDown={onKeyDown}
            onChange={onChange}
            value={newTag}
            className={styles.input}
          />
        </div>
      </SortableContext>
    </DndContext>
  );
};
