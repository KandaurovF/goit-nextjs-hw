'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/common/Buttons/Button';

export interface AddPromotionButtonProps {
  companyId: string;
}

export default function AddPromotionButton({
  companyId,
}: AddPromotionButtonProps) {
  const router = useRouter();

  return (
    <Button
      onClick={() =>
        router.push(`/companies/${companyId}/new-promotion`, { scroll: false })
      }
    >
      Add promotion
    </Button>
  );
}
