'use client';

import React from 'react';

interface GlobalErrorProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  let errorMessage = 'An unexpected error occurred. Please try again later.';

  if (error.message.includes('NetworkError')) {
    errorMessage = 'Network error: Please check your internet connection.';
  } else if (error.message.includes('500')) {
    errorMessage =
      'Server error: We are currently experiencing issues. Please try again later.';
  }

  return (
    <html>
      <body>
        <div className="flex items-center justify-center min-h-screen bg-red-100">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600">
              Oops! Something went wrong globally
            </h1>

            <p className="my-3 text-lg text-gray-500">{errorMessage}</p>

            <button
              onClick={() => reset()}
              className="px-4 py-2 bg-red-600 text-white text-center rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
