import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

export interface ISidebarItemsProps {
  current?: boolean;
  pathname: string;
  src: string;
  alt: string;
  children: React.ReactNode;
}

export default function SidebarItems({
  current,
  pathname,
  src,
  alt,
  children,
}: ISidebarItemsProps) {
  return (
    <li>
      <Link
        href={pathname}
        className={clsx(
          'flex items-center h-9 mx-1 gap-3.5',
          current &&
            'after:h-full after:ml-auto after:border-2 after:border-purple-200 after:rounded-sm',
        )}
      >
        <Image src={src} alt={alt} width={18} height={18} className="ml-5" />
        <span className="font-medium text-zinc-50">{children}</span>
      </Link>
    </li>
  );
}
