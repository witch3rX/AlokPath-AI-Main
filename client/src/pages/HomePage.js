import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="bg-glass backdrop-blur-lg border border-border-color p-10 rounded-2xl shadow-2xl flex flex-col items-center text-center">
      <h1 className="text-5xl font-bold text-white">
        Welcome to <span className="text-accent">AlokPath AI</span>
      </h1>
      <p className="text-2xl text-text-secondary mt-4">
        AI-driven education for a smarter, brighter career.
      </p>
      
      <div className="text-left max-w-3xl mt-12">
        <h2 className="text-3xl font-semibold text-white mb-4">What is AlokPath AI?</h2>
        <p className="text-text-secondary text-lg mb-6">
          AlokPath AI (আলোকপাথ AI) is an intelligent platform designed to guide students and professionals in Bangladesh through their academic and career journeys. By analyzing your unique skills, academic history, and interests, our system provides personalized recommendations to help you achieve your full potential.
        </p>

        <h2 className="text-3xl font-semibold text-white mb-4">Our Features</h2>
        <ul className="list-disc list-inside text-text-secondary text-lg space-y-3">
          <li>
            <span className="font-semibold text-white">AI Career Advisor (M1):</span> Upload your CV or transcript to get instant, data-driven career suggestions tailored for you.
          </li>
          <li>
            <span className="font-semibold text-white">Feature 2 (M2):</span> Discover the exact skills and courses you need to land your dream job. (Coming Soon)
          </li>
          <li>
            <span className="font-semibold text-white">Feature 3 (M3):</span> Answer a few simple questions to find careers that match your personality. (Coming Soon)
          *
          </li>
          <li>
            <span className="font-semibold text-white">Feature 4 (M4):</span> Search for relevant internship and job openings in your field. (Coming Soon)
          </li>
           <li>
            <span className="font-semibold text-white">Feature 5 (M5):</span> Test your knowledge with quizzes on Python, React, and more. (Coming Soon)
          </li>
           <li>
            <span className="font-semibold text-white">User Dashboard (M6):</span> Save your results, track your progress, and manage your profile. (Coming Soon)
          </li>
        </ul>
      </div>

      <Link 
        to="/career-advisor" 
        className="mt-12 bg-accent text-primary-bg font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-accent-hover transition duration-300 ease-in-out text-lg"
      >
        Try the Career Advisor Now
      </Link>
    </div>
  );
}