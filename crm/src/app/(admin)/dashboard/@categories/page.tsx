import React from 'react';
import { getCategories } from '@/app/lib/api';
import DashboardCard from '@/app/components/common/DashboardCard';
import { StatCard, StatCardType } from '@/app/components/common/StatCard';

export default async function Page() {
  const data = await getCategories();

  return (
    <DashboardCard label="Categories of companies">
      <div className="grid grid-cols-12 gap-3 pb-5 px-5">
        {data.map(({ categoryId, categoryTitle, companyCount }) => (
          <div key={categoryId} className="col-span-3">
            <StatCard
              type={StatCardType.Dark}
              label={categoryTitle}
              counter={companyCount}
            />
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
