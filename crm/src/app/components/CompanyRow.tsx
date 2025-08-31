import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import StatusLabel from '@/app/components/StatusLabel';
import { Company } from '@/app/lib/api';
import ActionMenu from './ActionMenu';

export interface CompanyRowProps {
  company: Company;
}

export default function CompanyRow({ company }: CompanyRowProps) {
  return (
    <tr className="h-14 text-center text-gray-900 bg-white">
      <td className="pl-4 text-left text-xs font-medium text-blue-700 rounded-l border-l-4 border-blue-700">
        {company.categoryTitle}
      </td>
      <td className="text-left w-96 hover:text-blue-700 hover:font-semibold transition-all duration-300">
        <Link
          href={`/companies/${company._id}`}
          className="flex gap-4 items-center"
        >
          {company.avatar ? (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 overflow-hidden">
              <Image
                src={company.avatar}
                alt="company avatar"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 overflow-hidden"></div>
          )}
          {company.title}
        </Link>
      </td>
      <td>
        <StatusLabel status={company.status} />
      </td>
      <td>
        <div className="flex items-center justify-center gap-1">
          <Image
            width={16}
            height={16}
            src={`/icons/${company.hasPromotions ? 'check' : 'x-mark'}.svg`}
            alt="promotion icon"
          />
          <span
            className={clsx(
              'text-sm font-medium',
              company.hasPromotions ? 'text-green-700' : 'text-red-700',
            )}
          >
            {company.hasPromotions ? 'Yes' : 'No'}
          </span>
        </div>
      </td>
      <td>{company.countryTitle}</td>
      <td className="rounded-r">
        {new Date(company.joinedDate).toLocaleDateString('uk-UA')}
      </td>
      <td className="w-10">
        <ActionMenu company={company} />
      </td>
    </tr>
  );
}
