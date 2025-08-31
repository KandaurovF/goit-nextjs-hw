'use client';

import React from 'react';
import Button from '@/app/components/common/Buttons/Button';
import { isFetchError } from '@/app/lib/utils/errorUtils';

export interface ErrorComponentProps {
  error: Error;
  reset: () => void;
  label?: string;
}

export default function ErrorComponent({
  error,
  reset,
  label,
}: ErrorComponentProps) {
  if (isFetchError(error)) {
    return (
      <div className="bg-gray-100 w-full h-full p-5 rounded">
        {label && (
          <h3 className="mb-5 text-xl	text-gray-900 font-medium">{label}</h3>
        )}
        <h2 className="text-lg font-semibold mb-1">
          Ooops! Something went wrong...
        </h2>
        <p className="text-base text-gray-500 font-normal mb-2">
          Error: {error.message}
        </p>
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    );
  } else {
    throw error;
  }
}
