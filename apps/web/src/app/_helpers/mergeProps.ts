import clsx from 'clsx';

export const mergeProps = <T extends Record<string, unknown>[]>(...props: T) => {
  const prop = { ...props.at(0) ?? {} };

  props.slice(1).forEach(nextProps => {
    Object.entries(nextProps).forEach(([key, value]) => {
      const baseValue = prop[key];

      if (/^on[A-Z]/.test(key)) {
        prop[key] = (...args: unknown[]) => {
          if (typeof baseValue === 'function') baseValue(...args);
          if (typeof value === 'function') value(...args);
        };
      }

      if (key === 'style') {
        if (typeof baseValue === 'object' && typeof value === 'object') {
          prop[key] = { ...baseValue, ...value };
        } else if (typeof value === 'object') {
          prop[key] = value;
        }
      }

      if (key === 'className') {
        if (typeof baseValue === 'string' && typeof value === 'string') {
          prop[key] = clsx(baseValue, value);
        } else if (typeof value === 'string') {
          prop[key] = value;
        }
      }
    });
  });

  return prop;
};
