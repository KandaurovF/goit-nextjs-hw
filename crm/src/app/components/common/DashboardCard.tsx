import clsx from 'clsx';
import React from 'react';

export interface IDashboardCardProps {
  label: React.ReactNode;
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function DashboardCard({
  label,
  isLoading = false,
  children,
}: IDashboardCardProps) {
  return (
    <div
      className={clsx(
        'rounded bg-gray-100 w-full h-full',
        isLoading && 'animate-pulse bg-gray-100',
      )}
    >
      <p className="p-5 text-xl	text-gray-900 font-medium">{label}</p>
      {isLoading ? (
        <p className="p-5 text-xl	text-gray-900 font-medium">Loading data...</p>
      ) : (
        children
      )}
    </div>
  );
}
