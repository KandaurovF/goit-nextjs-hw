import Image from 'next/image';
import React from 'react';

export interface ISearchFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearchClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function SearchInput({
  onSearchClick,
  ...rest
}: ISearchFieldProps) {
  return (
    <div className="relative w-96">
      <input
        {...rest}
        type="text"
        placeholder="Search..."
        className="w-full h-11 py-3 pl-3 pr-11 text-sm border border-gray-300 bg-gray-50 rounded"
      />
      <button
        type="button"
        className="absolute top-0 right-0 p-3"
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
