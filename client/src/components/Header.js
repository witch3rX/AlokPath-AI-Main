import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="w-full max-w-7xl mb-8 flex items-center space-x-3">
      {/* Custom SVG Logo */}
      <Link to="/" className="flex items-center space-x-3">
        <svg className="w-10 h-10 text-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10c1.82 0 3.543-.48 5.06-1.348l-1.07-1.782A7.95 7.95 0 0112 19.9a7.9 7.9 0 01-7.9-7.9 7.9 7.9 0 017.9-7.9c1.468 0 2.827.402 4.004 1.077L17.07 3.3C15.54 2.477 13.82 2 12 2zM21.5 13a.5.5 0 00-.5-.5h-3.5a.5.5 0 000 1h2.207l-4.14 4.14a.5.5 0 00.707.707L20 14.707V17a.5.5 0 001 0v-3.5a.5.5 0 00-.5-.5zM12 7a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 000-1h-2.5V7.5a.5.5 0 00-.5-.5z" fill="currentColor"/>
        </svg>
        <h1 className="text-3xl font-bold text-text-primary">
          AlokPath AI
        </h1>
      </Link>
    </header>
  );
}

