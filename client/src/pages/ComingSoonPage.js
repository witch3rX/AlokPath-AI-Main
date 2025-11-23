import React from 'react';
import { Link } from 'react-router-dom';

export default function ComingSoonPage({ featureName }) {
  return (
    <div className="bg-glass backdrop-blur-lg border border-border-color p-10 rounded-2xl shadow-2xl flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold text-accent">
        {featureName || "New Feature"}
      </h1>
      <p className="text-2xl text-text-secondary mt-4">
        This feature is under construction.
      </p>
      <p className="text-text-secondary mt-6 max-w-lg">
        Another team member is currently building this module. Please check back later!
      </p>
      <Link 
        to="/" 
        className="mt-10 bg-accent text-primary-bg font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-accent-hover transition duration-300 ease-in-out text-lg"
      >
        Go Back to Home
      </Link>
    </div>
  );
}