'use client';

import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCompanyPromotions } from '@/app/lib/api';
import Promotion from '@/app/components/Promotion';
import { useSearchStore } from '@/app/store/useSearchStore';
import HandleErrorComponent from '@/app/components/common/ErrorHandlers/HandleErrorComponent';

export interface CompanyPromotionProps {
  companyId: string;
}

export default function CompanyPromotions({
  companyId,
}: CompanyPromotionProps) {
  const { promotionSearchTerm } = useSearchStore();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['promotions', companyId, promotionSearchTerm],
    queryFn: () =>
      getCompanyPromotions(companyId, {
        cache: 'no-store',
        search: promotionSearchTerm,
      }),
    staleTime: 10 * 1000,
  });

  useEffect(() => {
    refetch();
  }, [promotionSearchTerm, refetch]);

  const notFoundMessage = promotionSearchTerm
    ? 'No results found'
    : "This company hasn't promotions";

  return (
    <>
      {isLoading && <p className="animate-pulse">Loading data...</p>}

      {isError && (
        <HandleErrorComponent
          error={error}
          notFoundMessage={notFoundMessage}
          refetch={refetch}
        />
      )}

      <ul className="grid grid-cols-12 gap-5">
        {data?.map((promotion) => (
          <li key={promotion._id} className="col-span-4">
            <Promotion promotion={promotion} />
          </li>
        ))}
      </ul>
    </>
  );
}
