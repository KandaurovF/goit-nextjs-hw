'use client';

import React from 'react';
import { getSummaryStats } from '@/app/lib/api';
import { StatCard, StatCardType } from '@/app/components/common/StatCard';
import { useQuery } from '@tanstack/react-query';

const labelByStat = {
  promotions: 'Total promotions',
  categories: 'Total categories',
  newCompanies: 'New companies',
  activeCompanies: 'Total active companies',
};

export default function Page() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['companies', 'summaryStats'],
    queryFn: () => getSummaryStats({ cache: 'no-cache' }),
    staleTime: 10 * 1000,
  });

  if (isError) {
    throw error;
  }

  return (
    <div className="grid grid-cols-12 gap-5 min-h-[152px]">
      {(Object.keys(labelByStat) as (keyof typeof data)[]).map((key) => (
        <div key={key} className="col-span-3">
          <StatCard
            type={StatCardType.Gradient}
            label={labelByStat[key]}
            counter={data?.[key] || ''}
            isLoading={isLoading}
          />
        </div>
      ))}
    </div>
  );
}
