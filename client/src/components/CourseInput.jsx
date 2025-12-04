import React, { useState } from 'react';
import axios from 'axios';

// Data Structure (Kept exactly the same)
const SCHOOL_DATA = {
  "SETS (School of Engineering, Technology & Sciences)": [
    "CSE (Computer Science & Engineering)",
    "EEE (Electrical & Electronic Engineering)",
    "ETE (Electronic & Telecom Engineering)",
    "CE (Civil Engineering)",
    "SE (Software Engineering)"
  ],
  "SBE (School of Business & Entrepreneurship)": [
    "Accounting",
    "Marketing",
    "Finance",
    "Economics",
    "Management"
  ],
  "SoL (School of Law)": ["LLB", "LLM"],
  "SPPH (School of Pharmacy & Public Health)": ["Pharmacy", "Public Health"],
  "SLASS (School of Liberal Arts & Social Sciences)": ["English", "Media & Communication"]
};

export default function CourseInput({ onDone }) {
  const [courses, setCourses] = useState([{ name: '', grade: '' }]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const addCourse = () => setCourses([...courses, { name: '', grade: '' }]);
  
  const update = (i, field, val) => {
    const copy = [...courses]; 
    copy[i][field] = val; 
    setCourses(copy);
    if (errorMessage) setErrorMessage(null);
  };

  const handleSchoolChange = (e) => {
    setSelectedSchool(e.target.value);
    setSelectedDept("");
  };

  const handleCheckAndProceed = async () => {
    setIsValidating(true);
    setErrorMessage(null);

    try {
      const resp = await axios.post('https://alokpath-ai.onrender.com/api/learning-path/validate-courses', { 
        courses: courses 
      });

      if (resp.data.valid) {
        onDone(courses);
      } else {
        setErrorMessage("Uh-oh! That course is playing hide-and-seek 😄 Double-check the spelling or wait for the next update. Thank you!.");
      }
    } catch (err) {
      console.error("Validation Error:", err);
      setErrorMessage("Server connection failed. Please try again.");
    } finally {
      setIsValidating(false);
    }
  };

  // --- STYLES ---
  const inputStyle = "w-full p-4 rounded-xl bg-gray-900/50 text-white border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 placeholder-gray-500 hover:border-gray-500";
  const labelStyle = "block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1";

  return (
    <div className="max-w-4xl mx-auto">
      
      {/* Main Glass Card */}
      <div className="bg-gray-800/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-gray-700 shadow-2xl shadow-black/50 relative overflow-hidden">
        
        {/* Background Decorative Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header Section */}
        <div className="relative z-10 mb-10 border-b border-gray-700/50 pb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-purple-400 mb-3 drop-shadow-sm">
            Student Profile
          </h2>
          <p className="text-gray-400 text-lg font-light">
            Tell us your academic background to personalize your roadmap.
          </p>
        </div>
        
        {/* Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 relative z-10">
          
          {/* School Dropdown */}
          <div className="group">
            <label className={`${labelStyle} group-focus-within:text-blue-400 transition-colors`}>School / Faculty</label>
            <div className="relative">
              <select 
                className={`${inputStyle} appearance-none cursor-pointer`}
                value={selectedSchool}
                onChange={handleSchoolChange}
              >
                <option value="">Select your School...</option>
                {Object.keys(SCHOOL_DATA).map((school) => (
                  <option key={school} value={school}>{school}</option>
                ))}
              </select>
              {/* Custom Chevron Icon */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          {/* Department Dropdown */}
          <div className="group">
            <label className={`${labelStyle} group-focus-within:text-blue-400 transition-colors`}>Department</label>
            <div className="relative">
              <select 
                className={`${inputStyle} appearance-none cursor-pointer ${!selectedSchool ? 'opacity-50 cursor-not-allowed bg-gray-800' : ''}`}
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                disabled={!selectedSchool}
              >
                <option value="">
                  {!selectedSchool ? "Select School first..." : "Select Department..."}
                </option>
                {selectedSchool && SCHOOL_DATA[selectedSchool].map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Course Input Section (Animated Fade In) */}
        {selectedDept && (
          <div className="animate-fade-in-up relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <h3 className="text-xl font-bold text-white">
                Current Courses <span className="text-gray-500 font-normal mx-2">|</span> <span className="text-blue-400">{selectedDept}</span>
              </h3>
            </div>
            
            <div className="space-y-4 bg-gray-900/30 p-6 rounded-2xl border border-gray-700/50">
              {courses.map((c, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-4 group">
                  <div className="flex-grow relative">
                     <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                     </span>
                     <input 
                        className={`${inputStyle} pl-12 ${errorMessage ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                        placeholder="Course Name (e.g. Algorithms)" 
                        value={c.name} 
                        onChange={e => update(i, 'name', e.target.value)} 
                     />
                  </div>
                  <div className="w-full sm:w-40 relative">
                     <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold text-sm">A+</span>
                     <input 
                        className={`${inputStyle} pl-12 text-center font-mono`}
                        placeholder="Grade" 
                        value={c.grade} 
                        onChange={e => update(i, 'grade', e.target.value)} 
                     />
                  </div>
                </div>
              ))}
            </div>

            {/* Error Message Box */}
            {errorMessage && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-start gap-4 animate-shake">
                <div className="bg-red-500/20 p-2 rounded-full text-red-400">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                   <h4 className="text-red-400 font-bold text-sm uppercase mb-1">Validation Error</h4>
                   <p className="text-red-200 text-sm leading-relaxed">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between">
              <button 
                onClick={addCourse}
                className="text-gray-400 hover:text-white text-sm font-semibold flex items-center gap-2 transition-colors px-4 py-2 rounded-lg hover:bg-gray-700/50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                Add Another Course
              </button>

              <button 
                onClick={handleCheckAndProceed} 
                disabled={courses[0].name === '' || isValidating}
                className={`
                  w-full md:w-auto px-10 py-4 rounded-full font-bold text-lg shadow-lg shadow-blue-900/30
                  transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3
                  ${courses[0].name === '' || isValidating
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white'}
                `}
              >
                {isValidating ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Verifying...
                  </>
                ) : (
                  <>
                    Next Step 
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}