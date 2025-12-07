import React, { useState } from 'react';
import careerData from '../../data/careerData.json';

export default function SkillsAssessment({ info, answers, setAnswers, onFinish }) {
  
  const semesterCount = parseInt(info.semester) || 0;
  const isJunior = semesterCount < 10;

  // Local State to track visual selections
  const [scenarioSelections, setScenarioSelections] = useState({});

  const sectionsToShow = isJunior 
    ? ['softSkills', 'extracurricular', 'behavior']
    : ['softSkills', 'technicalSkills', 'interest', 'extracurricular', 'behavior'];

  // Handle Checkboxes (Standard)
  const toggleAnswer = (sectionKey, item) => {
    const currentList = answers[sectionKey] || [];
    if (currentList.includes(item)) {
      setAnswers({ ...answers, [sectionKey]: currentList.filter(i => i !== item) });
    } else {
      setAnswers({ ...answers, [sectionKey]: [...currentList, item] });
    }
  };

  // Handle Scenarios (Gamified)
  const handleScenarioChoice = (sectionKey, questionIndex, optionIndex, skillName, isCorrect) => {
    // 1. Update Visual State (So the button highlights)
    setScenarioSelections(prev => ({
      ...prev,
      [sectionKey]: {
        ...(prev[sectionKey] || {}),
        [questionIndex]: optionIndex
      }
    }));
    
    // 2. Update Scoring Logic (Backend)
    const currentList = answers[sectionKey] || [];
    
    if (isCorrect) {
        // If correct, add the skill
        if (!currentList.includes(skillName)) {
            setAnswers({ ...answers, [sectionKey]: [...currentList, skillName] });
        }
    } else {
        // If wrong, remove the skill
        setAnswers({ ...answers, [sectionKey]: currentList.filter(i => i !== skillName) });
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up pb-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">Self Assessment</h2>
        <p className="text-gray-400">Be honest! We use this to calculate your industry fit.</p>
        {isJunior && (
          <span className="inline-block mt-2 bg-blue-900 text-blue-200 text-xs px-3 py-1 rounded-full">
            Junior Track (Sem {semesterCount})
          </span>
        )}
      </div>

      <div className="space-y-12">
        {sectionsToShow.map(key => {
          const section = careerData[key];
          
          // --- RENDER 1: GAMIFIED SCENARIO SECTION ---
          if (section.isScenario) {
            return (
              <div key={key} className="bg-gray-800/50 p-8 rounded-3xl border border-purple-500/30 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl"></div>
                
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6 flex items-center gap-2">
                  <span className="text-3xl">🎮</span> {section.title}
                </h3>
                
                <div className="space-y-8">
                  {section.questions.map((q, i) => {
                    return (
                      <div key={i} className="bg-gray-900 p-6 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition duration-300">
                        <h4 className="text-lg font-semibold text-white mb-4">
                          <span className="text-purple-400 font-bold mr-2">Q{i+1}:</span> 
                          {q.scenario}
                        </h4>
                        
                        <div className="space-y-3">
                          {q.options.map((opt, optIndex) => {
                            // Check if THIS specific button is selected
                            const isSelected = scenarioSelections[key]?.[i] === optIndex;

                            return (
                              <button
                                key={optIndex}
                                onClick={() => handleScenarioChoice(key, i, optIndex, q.skill, opt.isCorrect)}
                                className={`w-full text-left p-4 rounded-xl text-sm transition-all duration-200 border 
                                  ${isSelected 
                                    ? 'bg-purple-600 border-purple-500 text-white shadow-lg transform scale-[1.02]' // Active Style
                                    : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-750 hover:border-gray-500' // Inactive Style
                                  }
                                `}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-4 h-4 rounded-full border flex-shrink-0 ${isSelected ? 'bg-white border-white' : 'border-gray-500'}`}></div>
                                  <span>{opt.text}</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                        
                        {/* I HAVE REMOVED THE "Skill Verified" POPUP CODE FROM HERE 
                           It will now record the score silently.
                        */}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }

          // --- RENDER 2: STANDARD CHECKBOX SECTION ---
          return (
            <div key={key} className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
              <h3 className="text-xl font-bold text-blue-400 mb-6 border-b border-gray-700 pb-2">
                {section.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.items.map((item, i) => {
                  const isChecked = (answers[key] || []).includes(item);
                  return (
                    <label 
                      key={i} 
                      className={`flex items-center space-x-3 cursor-pointer p-4 rounded-xl border transition-all duration-200
                        ${isChecked 
                          ? 'bg-blue-900/30 border-blue-500 shadow-md' 
                          : 'bg-gray-900 border-gray-700 hover:border-gray-500'}`}
                    >
                      <div className={`w-6 h-6 rounded flex items-center justify-center border ${isChecked ? 'bg-blue-500 border-blue-500' : 'border-gray-500'}`}>
                        {isChecked && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden"
                        onChange={() => toggleAnswer(key, item)}
                        checked={isChecked}
                      />
                      <span className={`text-sm ${isChecked ? 'text-white font-medium' : 'text-gray-400'}`}>{item}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <button 
          onClick={onFinish}
          className="bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-12 rounded-full shadow-lg hover:shadow-green-500/20 transition transform hover:scale-105"
        >
          See Career Recommendation
        </button>
      </div>
    </div>
  );
}