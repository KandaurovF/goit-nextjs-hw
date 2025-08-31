'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/common/Buttons/Button';

export default function UnderConstruction() {
  const Router = useRouter();

  const hendleBackClick = () => {
    if (window.history.length > 1) {
      Router.back();
    } else {
      Router.replace('/');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        This page is under construction 🚧
      </h1>
      <p className="text-gray-600 mb-4">
        We're working on this section. Something cool will be coming soon! 💡
      </p>
      <Button onClick={hendleBackClick} className="mt-4 px-4 py-2">
        Back
      </Button>
    </div>
  );
}
