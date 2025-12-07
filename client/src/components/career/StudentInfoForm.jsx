import React, { useState } from 'react';
import careerData from '../../data/careerData.json'; // Import data for Roles list

// Data Structure (Kept exactly the same)
const SCHOOL_DATA = {
  "SETS (School of Engineering, Technology & Sciences)": [
    "CSE (Computer Science & Engineering)",
    "EEE (Electrical & Electronic Engineering)",
    "ETE (Electronic & Telecom Engineering)",
    "CSC (Computer Science )",
    "SE (Software Engineering)",
    "CEN (Computer Engineering )",
    "Mathematics",
    "Physics"
  ],
  "SBE (School of Business & Entrepreneurship)": [
    "Accounting",
    "Marketing",
    "Finance",
    "Economics",
    "General Management",
    "Human Resource Management (HRM)",
    "International Business",
    "Management Information System (MIS)"
  ],
  "SELS (School of Environment and Life Sciences)": ["Environmental Science and Management", "Biochemistry and Biotechnology","Microbiology"],
  "SPPH (School of Pharmacy & Public Health)": ["Pharmacy (BPharm)"],
  "SLASS (School of Liberal Arts & Social Sciences)": ["English Language Teaching","English Literature","Anthropology","Global Studies and Governance", "Sociology","Media & Communication"],
  "SoL (School of Law)": ["Law"]
};

export default function StudentInfoForm({ info, setInfo, onNext }) {
  const [selectedSchool, setSelectedSchool] = useState("");
  const [errors, setErrors] = useState({});

  const availableRoles = Object.keys(careerData.benchmarks || {});

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
        setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSchoolChange = (e) => {
    setSelectedSchool(e.target.value);
    setInfo({ ...info, dept: "" });
  };

  const handleDeptChange = (e) => {
    setInfo({ ...info, dept: e.target.value });
  };

  // --- VALIDATION LOGIC ---
  const validateAndProceed = () => {
    let newErrors = {};
    let isValid = true;

    // 1. Student ID Validation
    const idString = String(info.id);
    const validPrefixes = ['16', '17', '18', '19', '20', '21', '22', '23', '24', '25'];
    const prefix = idString.substring(0, 2);

    // Ensure it is numbers only, length is 7, and prefix matches
    if (idString.length !== 7 || !validPrefixes.includes(prefix) || isNaN(idString)) {
        newErrors.id = "Your Student ID is not Valid"; 
        isValid = false;
    }

    // 2. Semester Validation (0 - 30)
    const sem = parseInt(info.semester);
    if (isNaN(sem) || sem < 0 || sem > 30) {
        newErrors.semester = "Semester must be between 0 and 30";
        isValid = false;
    }

    // 3. CGPA Validation (1.00 - 4.00)
    const cgpa = parseFloat(info.cgpa);
    if (isNaN(cgpa) || cgpa < 1.00 || cgpa > 4.00) {
        newErrors.cgpa = "CGPA must be between 1.00 and 4.00";
        isValid = false;
    }

    // Check other required fields
    if (!info.name) { newErrors.name = "Name is required"; isValid = false; }
    if (!info.targetRole) { newErrors.targetRole = "Please select a role"; isValid = false; }
    if (!selectedSchool) { newErrors.school = "Required"; isValid = false; }
    if (!info.dept) { newErrors.dept = "Required"; isValid = false; }

    setErrors(newErrors);

    if (isValid) {
        onNext();
    }
  };

  // --- STYLES ---
  const inputStyle = "w-full p-4 rounded-xl bg-gray-900/50 text-white border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 placeholder-gray-500 hover:border-gray-500";
  const errorInputStyle = "border-red-500 focus:border-red-500 focus:ring-red-500/20"; 
  const labelStyle = "block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1 flex items-center gap-1";
  const mandatory = <span className="text-red-500 text-lg leading-none">*</span>;
  const errorMsgStyle = "text-red-400 text-xs mt-1 ml-1 font-bold";

  return (
    <div className="max-w-5xl mx-auto animate-fade-in-up">
      <div className="bg-gray-800/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-gray-700 shadow-2xl shadow-black/50 relative overflow-hidden">
        
        <div className="relative z-10 mb-10 border-b border-gray-700/50 pb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-blue-400 mb-3 drop-shadow-sm">
            Student Details
          </h2>
          <p className="text-gray-400 text-lg font-light">
            Discover Your Career Strengths in Minutes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          
          <div className="md:col-span-2">
             <label className={labelStyle}>Full Name {mandatory}</label>
             <input 
                name="name" 
                value={info.name} 
                onChange={handleChange} 
                className={`${inputStyle} ${errors.name ? errorInputStyle : ''}`} 
                placeholder="e.g. Rahima Alam" 
             />
             {errors.name && <p className={errorMsgStyle}>{errors.name}</p>}
          </div>

          <div className="md:col-span-2">
            <label className={labelStyle}>School / Faculty {mandatory}</label>
            <div className="relative">
              <select className={`${inputStyle} appearance-none cursor-pointer ${errors.school ? errorInputStyle : ''}`} value={selectedSchool} onChange={handleSchoolChange}>
                <option value="">Select your School...</option>
                {Object.keys(SCHOOL_DATA).map((school) => (
                  <option key={school} value={school}>{school}</option>
                ))}
              </select>
              {errors.school && <p className={errorMsgStyle}>{errors.school}</p>}
            </div>
          </div>

          <div>
            <label className={labelStyle}>Department {mandatory}</label>
            <div className="relative">
              <select className={`${inputStyle} appearance-none cursor-pointer ${!selectedSchool ? 'opacity-50 cursor-not-allowed bg-gray-800' : ''} ${errors.dept ? errorInputStyle : ''}`} value={info.dept} onChange={handleDeptChange} disabled={!selectedSchool}>
                <option value="">{!selectedSchool ? "Select School first..." : "Select Department..."}</option>
                {selectedSchool && SCHOOL_DATA[selectedSchool].map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              {errors.dept && <p className={errorMsgStyle}>{errors.dept}</p>}
            </div>
          </div>

          <div>
            <label className={`${labelStyle} text-blue-400`}>Target Career Role {mandatory}</label>
            <div className="relative">
              <select 
                className={`${inputStyle} border-blue-500/50 focus:border-blue-400 ${errors.targetRole ? errorInputStyle : ''}`}
                name="targetRole"
                value={info.targetRole || ""}
                onChange={handleChange}
              >
                <option value="">Select your Dream Job...</option>
                {availableRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              {errors.targetRole && <p className={errorMsgStyle}>{errors.targetRole}</p>}
            </div>
          </div>

          {/* --- ID CHANGED HERE: Removed arrows by changing type="text" --- */}
          <div>
             <label className={labelStyle}>Student ID {mandatory}</label>
             <input 
                name="id" 
                type="text" // Changed from 'number' to 'text' to remove arrows
                inputMode="numeric" // Keeps number pad on mobile
                maxLength={7}
                value={info.id} 
                onChange={(e) => {
                    // Only allow numbers to be typed
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) { 
                        handleChange(e); 
                    }
                }} 
                className={`${inputStyle} ${errors.id ? errorInputStyle : ''}`} 
                placeholder="e.g. 2010101" 
             />
             {errors.id && <p className={errorMsgStyle}>{errors.id}</p>}
          </div>

          {/* --- SEMESTER LIMITS (Arrows kept here as requested previously) --- */}
          <div>
             <label className={labelStyle}>Completed Semesters {mandatory}</label>
             <input 
                name="semester" 
                type="number" 
                min="0" 
                max="30" 
                value={info.semester} 
                onChange={handleChange} 
                className={`${inputStyle} ${errors.semester ? errorInputStyle : ''}`} 
                placeholder="e.g. 8" 
             />
             {errors.semester && <p className={errorMsgStyle}>{errors.semester}</p>}
          </div>

          {/* --- CGPA LIMITS --- */}
          <div className="md:col-span-2">
             <label className={labelStyle}>Current CGPA {mandatory}</label>
             <input 
                name="cgpa" 
                type="number" 
                step="0.01" 
                min="1.00" 
                max="4.00" 
                value={info.cgpa} 
                onChange={handleChange} 
                className={`${inputStyle} ${errors.cgpa ? errorInputStyle : ''}`} 
                placeholder="e.g. 3.50" 
             />
             {errors.cgpa && <p className={errorMsgStyle}>{errors.cgpa}</p>}
          </div>

        </div>

        <div className="mt-10">
          <button 
            onClick={validateAndProceed}
            className="w-full py-4 rounded-full font-bold text-lg shadow-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
          >
            Start Career Assessment &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}