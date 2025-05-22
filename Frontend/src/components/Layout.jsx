import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

function Layout({ children, showSidebar = false }) {
  return (
    <div className="min-h-screen flex bg-base-100">
      {/* Sidebar */}
      {showSidebar && (
        <div className="w-64 hidden lg:block border-r border-base-300">
          <Sidebar />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
