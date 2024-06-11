import React from 'react';
import Header from '@/app/components/Header';

export interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  return (
    <>
      <Header>Company ({params.id})</Header>
    </>
  );
}
