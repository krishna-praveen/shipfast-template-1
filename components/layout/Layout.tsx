"use client"

import { ReactNode } from 'react';

import { Sidebar } from '../features/Sidebar';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />

      <main className="h-screen flex-1 overflow-y-auto px-28 py-20">
        {children}
      </main>
    </div>
  );
}

export default Layout;
