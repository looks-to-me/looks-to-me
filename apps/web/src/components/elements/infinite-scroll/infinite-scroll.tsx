'use client';

import { Slot as SlotPrimitive } from 'radix-ui';
import { useRef, useState } from 'react';

import * as styles from './infinite-scroll.css';
import { useInViewPort } from '../../../hooks/use-in-view-port';

import type { ComponentProps, FC, ReactNode } from 'react';

export type InfiniteScrollCursor = string;

export type InfiniteScrollEdge = {
  cursor: InfiniteScrollCursor;
  node: ReactNode;
};

export type InfiniteScrollFetcherArguments = {
  cursor: InfiniteScrollCursor;
  size: number;
};

export type InfiniteScrollFetcher = (args: InfiniteScrollFetcherArguments) => Promise<InfiniteScrollEdge[]>;

export type InfiniteScrollProps = ComponentProps<'div'> & {
  asChild?: boolean | undefined;
  edges: InfiniteScrollEdge[];
  fetcher: InfiniteScrollFetcher;
};

export const InfiniteScroll: FC<InfiniteScrollProps> = ({
  asChild,
  edges,
  fetcher,
  ...props
}) => {
  const Wrapper = asChild ? SlotPrimitive.Slot : 'div';

  const [displayEdges, setDisplayEdges] = useState(edges);
  const [hasMore, setHasMore] = useState(0 < edges.length);

  const anchorRef = useRef<HTMLDivElement>(null);
  useInViewPort(anchorRef, async (entry) => {
    const cursor = displayEdges.at(-1)?.cursor;
    if (!entry.isIntersecting || !hasMore || !cursor) return;

    const edges = await fetcher({ cursor, size: displayEdges.length });
    if (edges.length <= 0) return setHasMore(false);

    setDisplayEdges((previous) => [...previous, ...edges]);
  });

  return (
    <Wrapper {...props}>
      {displayEdges.map((edge) => edge.node)}
      <div ref={anchorRef} className={styles.anchor} />
    </Wrapper>
  );
};
