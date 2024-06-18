'use client';

import { CompanyForm } from '@/app/components/CompanyFormModal';
import React from 'react';

export default function () {
  return (
    <div className="py-6 px-10">
      <CompanyForm onSubmit={console.log} />
    </div>
  );
}
