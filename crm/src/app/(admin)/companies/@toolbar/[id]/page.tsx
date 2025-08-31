'use client';

import React, { useState, useEffect } from 'react';
import Toolbar from '@/app/components/Toolbar';
import SearchInput from '@/app/components/SearchInput';
import AddPromotionButton from '@/app/components/AddPromotionButton';
import { useSearchStore } from '@/app/store/useSearchStore';

export interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  const { setPromotionSearchTerm } = useSearchStore();

  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setPromotionSearchTerm(localSearchTerm);
    }, 500);

    setDebounceTimeout(handler);

    return () => {
      clearTimeout(handler);
    };
  }, [localSearchTerm, setPromotionSearchTerm]);

  const handleSearch = () => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    setPromotionSearchTerm(localSearchTerm);
  };

  return (
    <Toolbar action={<AddPromotionButton companyId={params.id} />}>
      <SearchInput
        onSearchClick={handleSearch}
        onEnterPress={handleSearch}
        value={localSearchTerm}
        onChange={(e) => {
          setLocalSearchTerm(e.target.value);
        }}
      />
    </Toolbar>
  );
}
