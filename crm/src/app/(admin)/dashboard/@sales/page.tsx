import React from 'react';
import { getSummarySales } from '@/app/lib/api';
import DashboardCard from '@/app/components/common/DashboardCard';
import {
  SummaryTable,
  SummaryTableCell,
  SummaryTableHeader,
} from '@/app/components/SummaryTable';

export interface PageProps {}

export default async function Page() {
  const data = await getSummarySales();

  return (
    <DashboardCard label="Sales details">
      <SummaryTable
        headers={
          <>
            <SummaryTableHeader>Company</SummaryTableHeader>
            <SummaryTableHeader align="center">Sold</SummaryTableHeader>
            <SummaryTableHeader align="center">Income</SummaryTableHeader>
          </>
        }
      >
        {data.map(({ companyId, companyTitle, totalSold, totalIncome }) => (
          <tr key={companyId}>
            <SummaryTableCell>{companyTitle}</SummaryTableCell>
            <SummaryTableCell align="center">{totalSold}</SummaryTableCell>
            <SummaryTableCell align="center">{`$${totalIncome}`}</SummaryTableCell>
          </tr>
        ))}
      </SummaryTable>
    </DashboardCard>
  );
}
