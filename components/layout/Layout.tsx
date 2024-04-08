"use client"

import { ReactNode } from 'react';

import { Sidebar } from '../features/Sidebar';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      {/** TODO: Add mobile menu */}
      <main className="h-screen flex-1 overflow-y-auto md:px-28 md:py-20">
        {children}
      </main>
    </div>
  );
}

export default Layout;
