'use client';

import React from 'react';
import Header from '@/app/components/Header';
import CompanyInfo from '@/app/components/CompanyInfo';

export interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  return (
    <div className="py-6 px-10 grid grid-cols-12 gap-5">
      <div className="col-span-3">
        <CompanyInfo />
      </div>
    </div>
  );
}
