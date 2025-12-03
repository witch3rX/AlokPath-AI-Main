import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TopicSelection({ courses, onSubmit }) {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      const arr = [];
      for (const c of courses) {
        try {
          const resp = await axios.post('http://localhost:5000/api/learning-path/suggest-topics', { 
            courseName: c.name 
          });
          
          // SAFETY: Ensure we have an array
          let topics = Array.isArray(resp.data.topics) ? resp.data.topics : [];
          
          // SAFETY: If empty, create a fallback using the course name
          if (topics.length === 0) {
             topics = [{ topic: c.name, link: "" }];
          }

          arr.push({ ...c, suggestedTopics: topics, learnedTopics: [] });
        } catch (err) {
          console.error("API Error:", err);
          arr.push({ ...c, suggestedTopics: [{ topic: c.name, link: "" }], learnedTopics: [] });
        }
      }
      setState(arr);
      setLoading(false);
    }
    fetchAll();
  }, [courses]);

  const toggleLearned = (ci, topicName) => {
    const copy = [...state];
    const list = copy[ci].learnedTopics || [];
    if (list.includes(topicName)) {
        copy[ci].learnedTopics = list.filter(t => t !== topicName);
    } else {
        copy[ci].learnedTopics = [...list, topicName];
    }
    setState(copy);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Select topics you already know</h2>
      
      {loading && <p className="text-blue-400 animate-pulse mb-4">AI is analyzing your courses...</p>}

      <div className="space-y-6">
        {!loading && state.map((c, ci) => (
          <div key={ci} className="bg-gray-750 border border-gray-600 rounded-lg p-4">
            <h3 className="text-xl font-semibold text-blue-400 mb-4">{c.name}</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {(c.suggestedTopics || []).map((item, ti) => {
                
                // --- CRASH PROOF LINE ---
                // This guarantees 'displayName' is ALWAYS a string
                const displayName = item?.topic || item || "Unknown Topic";

                const isSelected = (c.learnedTopics || []).includes(displayName);

                return (
                  <label key={ti} className={`cursor-pointer border rounded p-3 flex items-center space-x-3 hover:bg-gray-700 transition ${isSelected ? 'bg-blue-900 border-blue-500' : 'border-gray-600'}`}>
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600 rounded"
                      checked={isSelected}
                      onChange={() => toggleLearned(ci, displayName)} 
                    />
                    <span className="text-sm text-gray-200">{displayName}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!loading && state.length > 0 && (
        <button 
          onClick={() => onSubmit(state)} 
          className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg mt-8 shadow-md transition"
        >
          Submit for Analysis &rarr;
        </button>
      )}
    </div>
  );
}