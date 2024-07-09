'use client';

import React, { useEffect, useMemo, useState } from 'react';

import dynamic from 'next/dynamic';

import clsx from 'clsx';
import { Country, getCountries, getCities } from '@/app/lib/api';
import DashboardCard from '@/app/components/common/DashboardCard';

import { GeocodedCityData } from '@/app/components/Map/Geocode';

export interface PageProps {}

const Page: React.FC<PageProps> = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [geocodedData, setGeocodedData] = useState<GeocodedCityData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCountries();
      setCountries(data);

      const citiesData = await getCities();

      // Dynamically import the geocodeCountries function
      const { geocodeCities } = await import('@/app/components/Map/Geocode');
      const geocoded = await geocodeCities(citiesData);
      setGeocodedData(geocoded);
    };

    fetchData();
  }, []);

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
