import React from 'react';

export default function TextButton({
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      type="button"
      className="inline-block font-semibold text-blue-600 hover:underline"
    />
  );
}
