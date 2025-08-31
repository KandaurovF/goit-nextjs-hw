'use client';

import React, { useEffect, useState } from 'react';
import Toolbar from '@/app/components/Toolbar';
import AddCompanyButton from '@/app/components/AddCompanyButton';
import SearchInput from '@/app/components/SearchInput';
import { useSearchStore } from '@/app/store/useSearchStore';

export default function Page() {
  const { setCompanySearchTerm } = useSearchStore();

  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setCompanySearchTerm(localSearchTerm);
    }, 500);

    setDebounceTimeout(handler);

    return () => {
      clearTimeout(handler);
    };
  }, [localSearchTerm, setCompanySearchTerm]);

  const handleSearch = () => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    setCompanySearchTerm(localSearchTerm);
  };

  return (
    <Toolbar action={<AddCompanyButton />}>
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
