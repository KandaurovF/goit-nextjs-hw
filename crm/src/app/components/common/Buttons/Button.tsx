'use client';

import React from 'react';
import clsx from 'clsx';

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

export default function Button({ disabled, ...rest }: IButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'py-2.5 px-5 text-zinc-50 text-base text-center font-medium rounded transition-all',
        disabled
          ? 'text-zinc-500 bg-gray-300 cursor-not-allowed' // disabled
          : 'bg-gray-900 hover:text-lime-200 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-950 active:bg-gradient-to-b', // !disabled
      )}
    />
  );
}
