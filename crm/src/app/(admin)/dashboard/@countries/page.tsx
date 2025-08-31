'use client';

import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import dynamic from 'next/dynamic';

import clsx from 'clsx';
import { Country, getCountries, getCities } from '@/app/lib/api';
import DashboardCard from '@/app/components/common/DashboardCard';

import { GeocodedCityData } from '@/app/components/Map/Geocode';

export interface PageProps {}

const Page: React.FC<PageProps> = () => {
  //Fetch countries data:
  const { data: countries = [], isLoading: isLoadingCountries } = useQuery<
    Country[]
  >({
    queryKey: ['countries'],
    queryFn: getCountries,
    staleTime: 60000,
  });

  // Fetch cities and geocode them:
  const { data: geocodedData = [], isLoading: isLoadingGeocoded } = useQuery<
    GeocodedCityData[]
  >({
    queryKey: ['geocodedData'],
    queryFn: async () => {
      const citiesData = await getCities();
      const { geocodeCities } = await import('@/app/components/Map/Geocode');
      return geocodeCities(citiesData);
    },
    staleTime: 60000,
  });

  const Map = useMemo(
    () =>
      dynamic(() => import('@/app/components/Map/index'), {
        loading: () => <p>Map is loading...</p>,
        ssr: false,
      }),
    [],
  );

  return (
    <DashboardCard label="Countries of companies">
      <div className="flex items-end pb-5 px-5 gap-2">
        <div>
          {countries.map(({ countryId, countryTitle, companyCount }) => (
            <p
              key={countryId}
              className={clsx(
                'text-sm text-gray-900 font-medium',
                'before:inline-block before:w-2 before:h-2 before:rounded-full before:align-middle before:mr-2 before:bg-purple-200',
              )}
            >{`${countryTitle} - ${companyCount}`}</p>
          ))}
        </div>
        {/* <Image width={395} height={260} src="/img/World.png" alt="world" /> */}
        <div className="bg-white-700 mx-auto  w-[495px] h-[260px]">
          <Map data={geocodedData} />
        </div>
      </div>
    </DashboardCard>
  );
};

export default Page;
