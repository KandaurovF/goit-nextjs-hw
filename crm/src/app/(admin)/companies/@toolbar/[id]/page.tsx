import React from 'react';
import Toolbar from '@/app/components/Toolbar';
import AddCompanyButton from '@/app/components/AddCompanyButton';
import SearchInput from '@/app/components/SearchInput';

export interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  return (
    <Toolbar action={<AddCompanyButton companyId={params.id} />}>
      <SearchInput />
    </Toolbar>
  );
}
