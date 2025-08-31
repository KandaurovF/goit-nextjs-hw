'use client';

import React from 'react';
import Image from 'next/image';
import SidebarItems from './SidebarItems';
import { usePathname, useRouter } from 'next/navigation';
import DashboardIcon from '/public/icons/squares.svg';
import CompaniesIcon from '/public/icons/briefcase.svg';
import ExitIcon from '/public/icons/arrow-left-on-rectangle.svg';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const hendleExitClick = () => {
    router.push('/');
  };

  return (
    <aside className="fixed top-0 left-0 z-50 w-60 h-screen">
      <div className="flex flex-col h-full overflow-y-auto bg-gray-900">
        <Image
          src="/icons/logo.svg"
          alt="logo"
          width={122}
          height={24}
          className="py-8 mb-11 mx-auto"
        />
        <ul className="space-y-7">
          <SidebarItems
            current={pathname === '/dashboard'}
            pathname="/dashboard"
            iconComponent={<DashboardIcon className="w-[18px] h-[18px]" />}
          >
            Dashboard
          </SidebarItems>

          <SidebarItems
            current={pathname === '/companies'}
            pathname="/companies"
            iconComponent={<CompaniesIcon className="w-[18px] h-[18px]" />}
          >
            Companies
          </SidebarItems>
        </ul>
        <button
          className="flex items-center gap-2 p-6 mx-auto mt-auto group transition-all"
          onClick={hendleExitClick}
        >
          <ExitIcon className="w-[18px] h-[18px] text-zinc-50 group-hover:text-lime-300" />
          <span className="font-medium text-white group-hover:text-lime-300">
            Exit
          </span>
        </button>
      </div>
    </aside>
  );
}
