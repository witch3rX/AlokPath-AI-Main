import React from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink for active styling

export default function Navbar() {
  
  // This is the base styling for a link
  const linkClass = "px-3 py-2 rounded-md text-sm font-medium text-text-secondary hover:bg-glass hover:text-white transition-all";
  
  // This styling is added automatically when the link is active
  const activeLinkClass = "bg-secondary-bg text-accent";

  const getLinkClass = ({ isActive }) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass;

  return (
    <nav className="w-full max-w-7xl bg-glass backdrop-blur-lg border border-border-color rounded-xl p-3 mb-8 flex items-center justify-between shadow-xl">
      <div className="flex space-x-3">
        <NavLink to="/" className={getLinkClass}>
          Home
        </NavLink>
        <NavLink to="/career-advisor" className={getLinkClass}>
          Career Advisor
        </NavLink>

        {/* --- Yousuf--- */}
        <NavLink to="/learning-path" className={getLinkClass}>
          Learning Path 
        </NavLink>
        {/* --- Rahima Alam (M3) - FIXED LINK --- */}
        
        <NavLink to="/feature-3" className={getLinkClass}>Career Assessment </NavLink>
         {/* --- Yousuf--- */}
        <NavLink to="/feature-3" className={getLinkClass}>
          Feature 3 (M3)
        </NavLink>
        <NavLink to="/feature-4" className={getLinkClass}>
          Feature 4 (M4)
        </NavLink>
        <NavLink to="/feature-5" className={getLinkClass}>
          Feature 5 (M5)
        </NavLink>
      </div>
      
      <div className="flex space-x-3">
        <NavLink to="/login" className="px-3 py-2 rounded-md text-sm font-bold bg-accent text-primary-bg hover:bg-accent-hover transition-all">
          Login / Sign Up
        </NavLink>
      </div>
    </nav>
  );
}