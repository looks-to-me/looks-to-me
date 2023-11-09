import { useEffect } from 'react';

import type { RefObject } from 'react';

export const useInViewPort = (
  target: RefObject<HTMLElement>,
  callback: (entry: IntersectionObserverEntry) => void | Promise<void>,
) => {
  useEffect(() => {
    if (!target.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry) void callback(entry);
    });
    observer.observe(target.current);

    return () => {
      observer.disconnect();
    };
  }, [callback, target]);
};
