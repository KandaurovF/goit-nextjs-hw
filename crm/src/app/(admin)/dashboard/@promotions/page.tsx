import React from 'react';
import DashboardCard from '@/app/components/common/DashboardCard';
import { getPromotions } from '@/app/lib/api';
import {
  SummaryTable,
  SummaryTableCell,
  SummaryTableHeader,
} from '@/app/components/SummaryTable';

export interface PageProps {}

export default async function Page({}: PageProps) {
  const data = await getPromotions();

  return (
    <DashboardCard label="Promotions">
      <SummaryTable
        headers={
          <>
            <SummaryTableHeader>Company</SummaryTableHeader>
            <SummaryTableHeader>Name</SummaryTableHeader>
            <SummaryTableHeader align="center">%</SummaryTableHeader>
          </>
        }
      >
        {data.map(({ _id, title, companyTitle, discount }) => (
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
