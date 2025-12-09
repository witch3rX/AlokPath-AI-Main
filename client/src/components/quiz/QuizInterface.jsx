import React from 'react';

const QuizInterface = ({ questions, answers, handleAnswer, onSubmit, loading }) => {
  // Simple completion check
  const isComplete = questions.every(q => answers[q.id]);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-3xl w-full border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-600 pb-2">Quiz</h2>
      
      <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
        {questions.map((q, index) => (
          <div key={q.id} className="bg-gray-900 p-4 rounded border border-gray-700">
            <p className="text-lg text-white mb-3"><span className="text-cyan-400 font-bold">Q{index + 1}:</span> {q.question}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {q.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(q.id, opt)}
                  className={`p-2 rounded text-left transition ${
                    answers[q.id] === opt 
                      ? 'bg-cyan-600 text-white font-bold' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-600">
        <button 
          onClick={onSubmit}
          disabled={!isComplete || loading}
          className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Calculating Result..." : "Submit Answers"}
        </button>
        {!isComplete && <p className="text-red-400 text-center mt-2 text-sm">Please answer all questions to submit.</p>}
      </div>
    </div>
  );
};

export default QuizInterface;