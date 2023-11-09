export const memoize = <T>(function_: () => T): () => T => {
  const cache: { value: T | undefined } = { value: undefined };
  return () => {
    if (cache.value) return cache.value;
    const result = function_();
    cache.value = result;
    return result;
  };
};
