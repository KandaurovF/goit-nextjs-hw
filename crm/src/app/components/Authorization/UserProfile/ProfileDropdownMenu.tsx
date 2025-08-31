import React, { Fragment } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import LogoutIcon from '/public/icons/arrow-left-on-rectangle.svg';
import SettingsIcon from '/public/icons/settings.svg';
import SettingsOullineIcon from '/public/icons/settings-outline.svg';
import UserIcon from '/public/icons/user.svg';
import UserOullineIcon from '/public/icons/user-outline.svg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/app/lib/utils/auth';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';

function ProfileDropdownMenu() {
  const Router = useRouter();

  const handleLogout = () => {
    // logoutUser();
    Router.replace('/');
  };

  return (
    <Menu as="div" className="relative">
      <div className="flex gap-3 items-center cursor-pointer">
        <MenuButton className="flex items-center gap-3 focus:outline-none">
          <Image
            width={44}
            height={44}
            alt="avatar"
            src="/img/default_avatar.png"
          />
          <div>
            <p className="font-semibold text-base text-gray-900">Adam Smith</p>
            <p className="text-sm font-light text-gray-900">
              adamsmith@gmail.com
            </p>
          </div>
        </MenuButton>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div>
            <MenuItem>
              {({ focus }) => (
                <Link
                  href="/profile"
                  className={clsx(
                    'group flex rounded items-center w-full px-4 py-2  text-sm text-gray-600 transition-colors duration-200',
                    focus && 'bg-gray-100 text-gray-950 font-semibold',
                  )}
                >
                  {focus ? (
                    <UserIcon className="w-[20px] h-[20px] mr-3 transition-opacity duration-200" />
                  ) : (
                    <UserOullineIcon className="w-[20px] h-[20px] mr-3 transition-opacity duration-200" />
                  )}
                  Profile
                </Link>
              )}
            </MenuItem>
            <MenuItem>
              {({ focus }) => (
                <Link
                  href="/under-construction"
                  className={clsx(
                    'group flex rounded items-center w-full px-4 py-2  text-sm text-gray-600 transition-colors duration-200',
                    focus && 'bg-gray-100 text-gray-950 font-semibold',
                  )}
                >
                  {focus ? (
                    <SettingsIcon className="w-[20px] h-[20px] mr-3 transition-opacity duration-200" />
                  ) : (
                    <SettingsOullineIcon className="w-[20px] h-[20px] mr-3 transition-opacity duration-200" />
                  )}
                  Settings
                </Link>
              )}
            </MenuItem>
          </div>
          <div>
            <MenuItem>
              {({ focus }) => (
                <button
                  onClick={handleLogout}
                  className={clsx(
                    'group flex rounded items-center w-full px-4 py-2  text-sm text-gray-600 transition-colors duration-200',
                    focus && 'bg-gray-100 text-gray-950 font-semibold',
                  )}
                >
                  <LogoutIcon className="w-[20px] h-[20px] mr-3 transition-opacity duration-200" />
                  LogOut
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}

export default ProfileDropdownMenu;
