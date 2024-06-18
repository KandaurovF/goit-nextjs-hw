import React from 'react';
import Header from '@/app/components/Header';

export interface IPageProps {
  params: { id: string };
}

export default function Page({ params }: IPageProps) {
  return <Header>{`Company (${params.id})`}</Header>;
}
