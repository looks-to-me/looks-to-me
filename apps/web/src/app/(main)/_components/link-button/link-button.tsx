'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '../../../../components/elements/button';

import type { ButtonProps } from '../../../../components/elements/button';
import type { LinkProps } from 'next/link';

export type LinkButtonProps<RouteType> = Omit<ButtonProps, 'asChild'> & Omit<LinkProps<RouteType>, 'ref'>;

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const LinkButton = <RouteType extends unknown>({
  href,
  disabled,
  children,
  ...props
}: LinkButtonProps<RouteType>) => {
  const path = usePathname();
  const isDisabled = disabled || path === href;

  return (
    <Button {...props} disabled={isDisabled} asChild>
      {isDisabled ? (
        <button>
          {children}
        </button>
      ) : (
        <Link href={href}>
          {children}
        </Link>
      )}
    </Button>
  );
};
