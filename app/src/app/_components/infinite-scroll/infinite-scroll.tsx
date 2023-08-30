'use client';

import { Slot } from '@radix-ui/react-slot';
import { forwardRef, useRef, useState } from 'react';

import * as styles from './infinite-scroll.css';
import { useInViewPort } from '../../_hooks/useInViewPort';

import type { ReactNode, ComponentPropsWithoutRef, ForwardRefRenderFunction } from 'react';

export type InfiniteScrollCursor = string;

export type InfiniteScrollEdge = {
  cursor: InfiniteScrollCursor;
  node: ReactNode;
};

export type InfiniteScrollFetcherArgs = {
  cursor: InfiniteScrollCursor;
  size: number;
};

export type InfiniteScrollFetcher = (args: InfiniteScrollFetcherArgs) => Promise<InfiniteScrollEdge[]>;

export type InfiniteScrollProps = ComponentPropsWithoutRef<'div'> & {
  asChild?: boolean | undefined;
  edges: InfiniteScrollEdge[];
  fetcher: InfiniteScrollFetcher;
};

const InfiniteScrollRender: ForwardRefRenderFunction<HTMLDivElement, InfiniteScrollProps> = ({
  asChild,
  edges,
  fetcher,
  ...props
}, ref): ReactNode => {
  const Wrapper = asChild ? Slot : 'div';

  const [displayEdges, setDisplayEdges] = useState(edges);
  const [hasMore, setHasMore] = useState(1 <= edges.length);

  const anchorRef = useRef<HTMLDivElement>(null);
  useInViewPort(anchorRef, async entry => {
    const cursor = displayEdges.at(-1)?.cursor;
    if (!entry.isIntersecting || !hasMore || !cursor) return;

    const edges = await fetcher({ cursor, size: displayEdges.length });
    if (edges.length <= 0) return setHasMore(false);

    setDisplayEdges(previous => [...previous, ...edges]);
  });

  return (
    <Wrapper {...props} ref={ref}>
      {displayEdges.map(edge => edge.node)}
      <div ref={anchorRef} className={styles.anchor} />
    </Wrapper>
  );
};

export const InfiniteScroll = forwardRef(InfiniteScrollRender);
