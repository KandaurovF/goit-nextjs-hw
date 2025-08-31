'use client';

import Image from 'next/image';
import React from 'react';

export interface SearchFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearchClick?: React.MouseEventHandler<HTMLButtonElement>;
  onEnterPress?: () => void;
}

export default function SearchInput({
  onEnterPress,
  onSearchClick,
  ...rest
}: SearchFieldProps) {
  return (
    <div className="relative w-96">
      <input
        {...rest}
        type="text"
        placeholder="Search..."
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onEnterPress) {
            onEnterPress();
          }
        }}
        className="w-full h-11 py-3 pl-3 pr-11 text-sm border border-gray-300 bg-gray-50 rounded"
      />
      <button
        type="button"
        className="absolute top-0 right-0 p-3 hover:bg-gray-300 rounded"
        onClick={onSearchClick}
      >
        <Image
          width={20}
          height={20}
          alt="search icon"
          src="/icons/magnifying-glass.svg"
        />
      </button>
    </div>
  );
}
