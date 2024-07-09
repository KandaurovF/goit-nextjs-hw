import React from 'react';
import CompanyTable from '@/app/components/CompanyTable';
import CompanyRow from '@/app/components/CompanyRow';
import { getCompanies } from '@/app/lib/api';

const headers = [
  'Catedory',
  'Company',
  'Status',
  'Promotions',
  'Country',
  'Joined date',
];

export default async function Page() {
  const data = await getCompanies();
  return (
    <div className="py-8 px-10 bg-gray-100">
      <table className="table-auto w-full border-separate border-spacing-y-2">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="pb-5 text-sm font-light text-gray-900">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((company) => (
            <CompanyRow key={company.id} company={company} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
