import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

export interface ISidebarItemsProps {
  current?: boolean;
  pathname: string;
  iconComponent: React.ReactNode;
  children: React.ReactNode;
}

export default function SidebarItems({
  current,
  pathname,
  iconComponent,
  children,
}: ISidebarItemsProps) {
  return (
    <li>
      <Link
        href={pathname}
        className={clsx(
          'flex items-center h-9 mx-1 gap-3.5 transition-all group',

          current &&
            'after:h-full after:ml-auto after:border-2 after:border-purple-200 after:rounded-sm',
        )}
      >
        <span
          className={clsx(
            'ml-5',
            current ? 'text-purple-200' : 'text-zinc-50',
            'group-hover:text-lime-300',
          )}
        >
          {iconComponent}
        </span>

        <span
          className={clsx(
            'font-medium',
            current ? 'text-purple-200' : 'text-zinc-50',
            'group-hover:text-lime-300',
          )}
        >
          {children}
        </span>
      </Link>
    </li>
  );
}
