"use client"

import { ReactNode } from 'react';

import Sidebar from './Sidebar';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-8 pt-8 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  );
}

export default Layout;
