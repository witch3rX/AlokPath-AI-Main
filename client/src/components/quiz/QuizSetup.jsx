import React from 'react';

const QuizSetup = ({ name, setName, career, setCareer, onStart, loading }) => {
  const careers = [
    "Data Analyst",
    "Research Assistant",
    "Quality Control Officer",
    "Lab Technician",
    "Teacher / Instructor",
    "Banking & Finance Jobs",
    "IT Support / Technical Support"
  ];

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full border border-gray-700">
      <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center">Career Path Quiz</h2>
      
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Full Name</label>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:border-cyan-400 focus:outline-none"
          placeholder="Enter your name"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-300 mb-2">Select Career Path</label>
        <select 
          value={career}
          onChange={(e) => setCareer(e.target.value)}
          className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:border-cyan-400 focus:outline-none"
        >
          <option value="" disabled>-- Select a Career --</option>
          {careers.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <button 
        onClick={onStart}
        disabled={loading || !name || !career}
        className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3 rounded transition duration-200 disabled:opacity-50"
      >
        {loading ? "Loading..." : "Start Quiz"}
      </button>
    </div>
  );
};

export default QuizSetup;