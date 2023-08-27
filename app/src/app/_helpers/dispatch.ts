export const dispatch = <Args extends unknown[]>(
  callback: (...args: Args) => Promise<unknown>,
): ((...args: Args) => void) => {
  return (...args: Args) => void callback(...args);
};
