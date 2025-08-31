import React from 'react';
import Sidebar from '@/app/components/Sidebar';
import Footer from '@/app/components/Footer';
import { Toaster } from 'react-hot-toast';

export interface ILayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="ml-60 flex flex-col flex-1">
        <div className="flex-grow">{children}</div>
        <Footer />
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
