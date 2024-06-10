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
        'py-2.5 px-5 text-zinc-50 text-base text-center font-medium rounded',
        !disabled && 'hover: bg-gray-800 active: bg-gray-950',
        disabled && 'text-zinc-100',
      )}
    />
  );
}
