"use client"

import { ReactNode } from 'react';

import Sidebar from './Sidebar';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />

      <main className="h-screen flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}

export default Layout;
