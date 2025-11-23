import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';

// This component wraps every page, so the Header and Navbar are always visible
export default function Layout() {
  return (
    <div className="min-h-screen w-full p-4 md:p-10 flex flex-col items-center">
      <Header />
      <Navbar />
      <main className="w-full max-w-7xl">
        {/* Outlet is where React Router renders the current page (e.g., HomePage, CareerAdvisorPage) */}
        <Outlet />
      </main>
    </div>
  );
}