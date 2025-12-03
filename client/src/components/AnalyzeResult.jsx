import React, { useState } from 'react';
import axios from 'axios';

export default function AnalyzeResult({ preparedCourses }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    setLoading(true);
    try {
      const payload = {
        userId: null,
        semester: 'Current Semester',
        courses: preparedCourses.map(c => ({ 
            name: c.name, 
            grade: c.grade, 
            learnedTopics: c.learnedTopics 
        }))
      };
      // Ensure this URL is correct
      const resp = await axios.post('http://localhost:5000/api/learning-path/analyze', payload);
      setResult(resp.data);
    } catch (err) {
      console.error(err);
      alert('Error generating plan');
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Action Section (Before Analysis) */}
      {!result && (
        <div className="bg-gray-800 p-8 rounded-lg text-center border border-gray-700 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Create Your Path?</h2>
          <button 
            onClick={send} 
            disabled={loading} 
            className={`
              font-bold py-3 px-8 rounded-full text-white shadow-md transition transform hover:scale-105
              ${loading ? 'bg-gray-600' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500'}
            `}
          >
            {loading ? 'Generating...' : 'Generate Learning Path'}
          </button>
        </div>
      )}

      {/* Results Section (After Analysis) */}
      {result && (
        <div className="animate-fade-in-up">
          
          {/* NEW: Attractive Smart Summary Card */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 shadow-2xl mb-10 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-10 rounded-full blur-3xl transform translate-x-10 -translate-y-10"></div>
            
            <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
              {/* AI Icon/Score Circle */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full border-4 border-blue-500 flex items-center justify-center bg-gray-800 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <span className="text-3xl">🤖</span>
                </div>
              </div>

              {/* Text Content */}
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-blue-400 mb-2 uppercase tracking-wide">
                  AI Performance Insight
                </h3>
                <p className="text-gray-200 text-lg leading-relaxed italic font-light">
                  "{result.summary}"
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-6 pl-2 border-l-4 border-blue-500">Your Weekly Roadmap</h3>
          
          {/* Weekly Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {result.weeklyPlan.map((w) => (
              <div key={w.week} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden shadow-lg hover:border-gray-500 transition">
                <div className="bg-gray-900 p-4 border-b border-gray-700">
                  <span className="text-blue-400 font-bold text-lg">Week {w.week}</span>
                </div>
                <div className="p-5">
                  <h4 className="text-xs uppercase text-gray-500 font-bold tracking-wider mb-3">Topic Resources</h4>
                  <ul className="space-y-3 mb-6">
                    {w.topics.map((rawString, i) => {
                      const [topicName, link] = rawString.split('|');
                      return (
                        <li key={i} className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-700/50 p-3 rounded border border-gray-600">
                          <span className="text-gray-200 text-sm font-medium mb-2 sm:mb-0 mr-2">{topicName}</span>
                          
                          {link && (
                            <a 
                              href={link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-full transition flex items-center justify-center gap-1 min-w-[110px]"
                            >
                              <span>Watch / Read</span>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                            </a>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                  
                  <h4 className="text-xs uppercase text-gray-500 font-bold tracking-wider mb-2">Activities</h4>
                  <ul className="space-y-1">
                    {w.activities.map((a, i) => (
                        <li key={i} className="text-gray-400 text-sm">• {a}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Start Over Button */}
          <div className="mt-12 text-center pb-12">
             <button 
                onClick={() => window.location.reload()}
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105 flex items-center justify-center gap-2 mx-auto border border-gray-500"
             >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                Start Over
             </button>
          </div>

        </div>
      )}
    </div>
  );
}