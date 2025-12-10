import React from 'react';

const QuizResult = ({ result, onRetake }) => {
  const { studentName, score, total, isPass, percentage } = result;

  return (
    <div className="bg-gray-800 p-10 rounded-lg shadow-xl max-w-md w-full text-center border border-gray-700">
      <div className="text-6xl mb-4">
        {isPass ? "🏆" : "📚"}
      </div>
      
      <h2 className={`text-4xl font-extrabold mb-2 ${isPass ? "text-green-400" : "text-red-500"}`}>
        {isPass ? "PASSED" : "FAILED"}
      </h2>
      
      <p className="text-xl text-white mb-6">
        {isPass ? `Great job, ${studentName}!` : `Keep studying, ${studentName}.`}
      </p>

      <div className="bg-gray-900 p-6 rounded-lg mb-8 border border-gray-700">
        <div className="flex justify-between text-gray-400 text-sm mb-1">
          <span>Score</span>
          <span>Percentage</span>
        </div>
        <div className="flex justify-between items-end">
          <span className="text-3xl font-bold text-white">{score} / {total}</span>
          <span className={`text-2xl font-bold ${isPass ? "text-green-400" : "text-red-400"}`}>{percentage}%</span>
        </div>
      </div>

      <button 
        onClick={onRetake}
        className="px-8 py-3 border border-cyan-500 text-cyan-400 rounded hover:bg-cyan-900/50 transition w-full font-bold"
      >
        Take Another Quiz
      </button>
    </div>
  );
};

export default QuizResult;