import React from 'react';

export interface IToolbarProps {
  children: React.ReactNode;
  action?: React.ReactNode;
}

export default function Toolbar({ children, action }: IToolbarProps) {
  return (
    <div className="px-10 py-8 flex items-center justify-between">
      {children}
      {action}
    </div>
  );
}
