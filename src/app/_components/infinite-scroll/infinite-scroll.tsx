'use client';

import { Slot } from '@radix-ui/react-slot';
import { forwardRef, useRef, useState } from 'react';

import * as styles from './infinite-scroll.css';
import { useInViewPort } from '../../_hooks/useInViewPort';

import type { ReactNode, ComponentPropsWithoutRef, ForwardRefRenderFunction } from 'react';

export type InfiniteScrollProps = ComponentPropsWithoutRef<'div'> & {
  asChild?: boolean | undefined;
  nodes: ReactNode[];
  fetcher: (offset: number) => Promise<ReactNode[]>;
};

const InfiniteScrollRender: ForwardRefRenderFunction<HTMLDivElement, InfiniteScrollProps> = ({
  asChild,
  nodes,
  fetcher,
  ...props
}, ref): ReactNode => {
  const Wrapper = asChild ? Slot : 'div';

  const [displayNodes, setDisplayNodes] = useState(nodes);
  const [hasMore, setHasMore] = useState(true);

  const anchorRef = useRef<HTMLDivElement>(null);
  useInViewPort(anchorRef, async entry => {
    if (!entry.isIntersecting || !hasMore) return;

    const nodes = await fetcher(displayNodes.length);
    if (nodes.length <= 0) return setHasMore(false);

    setDisplayNodes(previous => [...previous, ...nodes]);
  });

  return (
    <Wrapper {...props} ref={ref}>
      {displayNodes}
      <div className={styles.anchor} ref={anchorRef} />
    </Wrapper>
  );
};

export const InfiniteScroll = forwardRef(InfiniteScrollRender);
