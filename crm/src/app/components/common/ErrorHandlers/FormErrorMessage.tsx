import React from 'react';

export interface FormErrorMessageProps {
  errorMessage?: string | null;
  errorDetail?: string;
}

export default function FormErrorMessage({
  errorMessage,
  errorDetail,
}: FormErrorMessageProps) {
  return (
    <div className="flex flex-col gap-1">
      {errorMessage && <h3>{errorMessage}</h3>}
      {errorDetail && (
        <p className="text-sm text-red-500">Error: {errorDetail}</p>
      )}
    </div>
  );
}
