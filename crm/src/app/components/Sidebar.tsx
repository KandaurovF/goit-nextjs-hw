import React from 'react';
import Image from 'next/image';
import SidebarItems from './SidebarItems';

export default function Sidebar() {
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
            pathname="/dashboard"
            src="/icons/squares.svg"
            alt="dashboard icon"
          >
            Dashboard
          </SidebarItems>

          <SidebarItems
            pathname="/companies"
            src="/icons/briefcase.svg"
            alt="companies icon"
          >
            Companies
          </SidebarItems>
        </ul>
        <button className="flex items-center gap-2 p-6 mx-auto mt-auto">
          <Image
            className=""
            src="/icons/arrow-left-on-rectangle.svg"
            alt="exit icon"
            width={18}
            height={18}
          />
          <span className="font-medium text-white">Exit</span>
        </button>
      </div>
    </aside>
  );
}
