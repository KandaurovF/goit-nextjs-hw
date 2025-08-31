'use client';

import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCompanies } from '@/app/lib/api';
import CompanyRow from '@/app/components/CompanyRow';
import { useSearchStore } from '@/app/store/useSearchStore';
import clsx from 'clsx';
import HandleErrorComponent from '@/app/components/common/ErrorHandlers/HandleErrorComponent';

export interface CompanyTableProps {}

const headers = ['Status', 'Promotion', 'Country', 'Joined date'];

export default function CompanyTable({}: CompanyTableProps) {
  const { companySearchTerm } = useSearchStore();

  const { data, isError, error, isLoading, refetch } = useQuery({
    queryKey: ['companies', companySearchTerm],
    queryFn: () =>
      getCompanies({ cache: 'no-store', search: companySearchTerm }),
    staleTime: 10 * 1000,
  });

  useEffect(() => {
    refetch();
  }, [companySearchTerm, refetch]);

  const notFoundMessage = companySearchTerm
    ? 'No results found'
    : 'There is no company data yet';

  return (
    <div
      className={clsx(
        'pt-8 pb-14 px-10 bg-gray-100',
        isLoading && 'animate-pulse ',
      )}
    >
      <table className="table-auto w-full border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th className="pb-5 text-left text-sm font-light text-gray-900">
              Category
            </th>
            <th className="pb-5 text-left text-sm font-light text-gray-900">
              Company
            </th>
            {headers.map((header, i) => (
              <th className="pb-5 text-sm font-light text-gray-900" key={i}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={headers.length + 2}>Loading data...</td>
            </tr>
          )}
          {isError && (
            <tr>
              <td colSpan={headers.length + 2}>
                <HandleErrorComponent
                  error={error as Error}
                  notFoundMessage={notFoundMessage}
                  refetch={refetch}
                />
              </td>
            </tr>
          )}

          {data?.map((company) => (
            <CompanyRow key={company._id} company={company} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
