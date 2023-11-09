export const dispatch = <Arguments extends unknown[]>(
  callback: (...arguments_: Arguments) => Promise<unknown>,
): ((...arguments_: Arguments) => void) => {
  return (...arguments_: Arguments) => void callback(...arguments_);
};
