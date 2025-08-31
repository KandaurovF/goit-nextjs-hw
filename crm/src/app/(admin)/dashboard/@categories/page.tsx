'use client';

import React from 'react';
import { getCategories } from '@/app/lib/api/categories';
import DashboardCard from '@/app/components/common/DashboardCard';
import { StatCard, StatCardType } from '@/app/components/common/StatCard';
import { useQuery } from '@tanstack/react-query';
import ErrorComponent from '../error';

export default function Page() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['companies', 'categories'],
    queryFn: () => getCategories({ cache: 'no-cache' }),
    staleTime: 10 * 1000,
  });

  if (isError) {
    return (
      <ErrorComponent
        label="Categories of companies"
        error={error}
        reset={refetch}
      />
    );
  }

  return (
    <DashboardCard label="Categories of companies" isLoading={isLoading}>
      <ul className="grid grid-cols-12 gap-3 pb-5 px-5">
        {data?.map(({ categoryId, categoryTitle, companyCount }) => (
          <li key={categoryId} className="col-span-3">
            <StatCard
              type={StatCardType.Dark}
              label={categoryTitle}
              counter={companyCount}
              isLoading={isLoading}
            />
          </li>
        ))}
      </ul>
    </DashboardCard>
  );
}
