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
            <span className="font-semibold text-white">AI Career Advisor:</span> Upload your CV or transcript to get instant, data-driven career suggestions tailored for you.
          </li>
          <li>
            <span className="font-semibold text-white">Learning Path:</span> Generate a step-by-step syllabus and course recommendations based on your current skills.
          </li>
          <li>
            <span className="font-semibold text-white">Career Assessment:</span> Answer a few simple questions to find careers that match your personality. 
          </li>
          <li>
            <span className="font-semibold text-white">Feature 4 (M4):</span> Search for relevant internship and job openings in your field. (Coming Soon)
          </li>
        </ul>

  );
}
