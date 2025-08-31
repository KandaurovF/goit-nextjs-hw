'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import DashboardCard from '@/app/components/common/DashboardCard';
import { getPromotions } from '@/app/lib/api';
import {
  SummaryTable,
  SummaryTableCell,
  SummaryTableHeader,
} from '@/app/components/SummaryTable';
import ErrorComponent from '../error';

export interface PageProps {}

export default function Page({}: PageProps) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['promotions'],
    queryFn: () => getPromotions({ cache: 'no-store' }),
    staleTime: 10 * 1000,
  });

  if (isError) {
    return <ErrorComponent label="Promotions" error={error} reset={refetch} />;
  }

  return (
    <DashboardCard label="Promotions" isLoading={isLoading}>
      <SummaryTable
        headers={
          <>
            <SummaryTableHeader>Company</SummaryTableHeader>
            <SummaryTableHeader>Name</SummaryTableHeader>
            <SummaryTableHeader align="center">%</SummaryTableHeader>
          </>
        }
      >
        {data?.map(({ _id, title, companyTitle, discount }) => (
          <tr key={_id}>
            <SummaryTableCell>{companyTitle}</SummaryTableCell>
            <SummaryTableCell>{title}</SummaryTableCell>
            <SummaryTableCell align="center">{`-${discount}%`}</SummaryTableCell>
          </tr>
        ))}
      </SummaryTable>
    </DashboardCard>
  );
}
