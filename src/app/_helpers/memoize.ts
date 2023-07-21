export const memoize = <T>(fn: () => T): () => T => {
  const cache: { value: T | undefined } = { value: undefined };
  return () => {
    if (cache.value) return cache.value;
    const result = fn();
    cache.value = result;
    return result;
  };
};
