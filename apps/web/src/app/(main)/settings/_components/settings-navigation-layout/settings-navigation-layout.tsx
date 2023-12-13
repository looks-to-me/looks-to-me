'use client';
import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import * as styles from './settings-navigation-layout.css';
import { Button, ButtonIcon } from '../../../../_components/button';
import HomeIcon from '../../../../_icons/home.svg';

import type { ReactNode, FC } from 'react';

const SETTING_ITEMS = [
  {
    name: 'Muted Users',
    href: '/settings/mute-user',
  },
  {
    name: 'Test Setting1',
    href: '/',
  },
  {
    name: 'Test Setting2',
    href: '/',
  },
  {
    name: 'Test Setting3',
    href: '/',
  },
] as const;

export type SettingsNavigationLayoutProps = {
  className?: string | undefined;
  children: ReactNode;
};

export const SettingsNavigationLayout: FC<SettingsNavigationLayoutProps> = ({
  className,
  children,
}) => {
  const pathname = usePathname();
  return (
    <div className={clsx(className, styles.wrapper)}>
      <div className={styles.menu}>
        {SETTING_ITEMS.map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            size="medium"
            className={styles.menuItem}
            data-is-current-page={
              pathname === '/settings'
                ? item.href === '/settings/mute-user'
                : pathname === item.href
            }
            borderless
            asChild
          >
            <Link href={item.href}>
              <ButtonIcon>
                <HomeIcon />
              </ButtonIcon>
              {item.name}
            </Link>
          </Button>
        ))}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
