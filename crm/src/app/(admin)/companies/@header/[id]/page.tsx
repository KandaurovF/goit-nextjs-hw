import React from 'react';
import { Company, getCompany } from '@/app/lib/api';
import getQueryClient from '@/app/lib/utils/getQueryClient';
import Header from '@/app/components/Header';

export interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['companies', params.id],
    queryFn: () => getCompany(params.id, { cache: 'no-store' }),
    staleTime: 10 * 1000,
  });

  const company = queryClient.getQueryData(['companies', params.id]) as Company;

  return <Header>{company?.title}</Header>;
}
