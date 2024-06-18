'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/app/components/common/Modal';
import { CompanyForm } from '@/app/components/CompanyFormModal';

export default function Page() {
  const router = useRouter();

  return (
    <Modal show={true} onClose={() => router.back()}>
      <CompanyForm onSubmit={console.log} />
    </Modal>
  );
}
