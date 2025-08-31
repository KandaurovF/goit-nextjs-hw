'use client';

import React from 'react';
import ProfileDropdownMenu from './Authorization/UserProfile/ProfileDropdownMenu'; // Импортируйте ваш компонент меню профиля

export interface IHeaderProps {
  children: React.ReactNode;
}

export default function Header({ children }: IHeaderProps) {
  return (
    <header className="flex items-center gap-5 py-6 px-10 border-b border-gray-300">
      <h1 className="flex-1 text-3xl font-semibold text-gray-900">
        {children}
      </h1>

      <div className="w-px self-stretch bg-gray-300"></div>
      <ProfileDropdownMenu />
    </header>
  );
}
