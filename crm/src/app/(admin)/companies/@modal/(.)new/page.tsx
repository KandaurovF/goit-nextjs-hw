'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { CompanyFormModal } from '@/app/components/CompanyFormModal';

export default function Page() {
  const router = useRouter();

  return <CompanyFormModal show={true} onClose={() => router.back()} />;
}
