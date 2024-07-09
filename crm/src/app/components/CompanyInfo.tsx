import React from 'react';
import Image from 'next/image';
import { getCompany } from '../lib/api';
import StatusLabel from '@/app/components/StatusLabel';

export interface CompanyInfoProps {
  companyId: string;
}

export default function CompanyInfo({ companyId }: CompanyInfoProps) {
  if (!company) {
    return null;
  }
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center p-7 gap-5 bg-grey-900 rounded">
        <div className="w-20 h-20 rounded-full bg-blue-500"></div>
      </div>
      CompanyInfo
    </div>
  );
}
