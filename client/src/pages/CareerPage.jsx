import React, { useState } from 'react';

// Components
import StudentInfoForm from '../components/career/StudentInfoForm';
import SkillsAssessment from '../components/career/SkillsAssessment';
import CareerResult from '../components/career/CareerResult';

// Data
import careerData from '../data/careerData.json';

export default function CareerPage() {
  const [step, setStep] = useState(1);
  const [info, setInfo] = useState({ name: '', id: '', dept: '', semester: '', cgpa: '' });
  const [answers, setAnswers] = useState({});
  const [finalResult, setFinalResult] = useState(null);
  const [sectionScores, setSectionScores] = useState({}); 

  const calculateAndShowResults = () => {
    let totalScore = 0;
    let newSectionScores = {};
    
    // Loop through keys in JSON
    Object.keys(careerData).forEach(key => {
      
      // --- THE CRITICAL FIX ---
      // We MUST skip 'benchmarks' because it is data, not questions.
      if (key === 'benchmarks') return; 
      // ------------------------

      const userChecks = answers[key] || [];
      const sectionData = careerData[key];
      
      let sectionScore = 0;
      // Safety Check: Ensure 'items' exists
      if (sectionData && sectionData.items && sectionData.items.length > 0) {
        sectionScore = (userChecks.length / sectionData.items.length) * sectionData.maxMarks;
      }
      
      newSectionScores[key] = Math.round(sectionScore);
      totalScore += sectionScore;
    });

    const score = Math.round(totalScore);
    const cgpa = parseFloat(info.cgpa);
    const dept = info.dept ? info.dept.toLowerCase() : "";

    // 1. Determine Domain
    let domain = "";
    if (dept.includes('cse') || dept.includes('computer')) domain = "Software & Technology";
    else if (dept.includes('eee') || dept.includes('electrical')) domain = "Core Engineering & Power";
    else if (dept.includes('bba') || dept.includes('business')) domain = "Business & Corporate";
    else if (dept.includes('law')) domain = "Legal Consultancy";
    

    // 2. Determine Sector
    let sector = "";
    if (score >= 90) sector = "Research roles, Leadership Trainee, High-level Tech jobs";
    else if (score >= 75) sector = "Corporate Jobs, Mid-level Dev, Banking, Project Mgmt";
    else if (score >= 60) sector = "Junior Support, Sales & Marketing, Freelancing";
    else sector = "Internships, Apprenticeships & Skill-based Short Courses";

    // 3. Generate Advice
    let advice = "";
    if (score >= 75 && cgpa >= 3.5) {
        advice = "You are a top-tier candidate! Your high CGPA and strong skills make you perfect for competitive roles. Focus on networking now.";
    } else if (score >= 60) {
        advice = "You have good potential. Your skills are solid, but consider building a practical portfolio to stand out more.";
    } else {
        advice = "Focus on building your foundation. Don't worry—join a university club and take online courses to boost your score quickly.";
    }

    setSectionScores(newSectionScores);
    setFinalResult({ score, domain, sector, advice });
    setStep(3);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gray-900">
      
      {step === 1 && (
        <StudentInfoForm 
            info={info} 
            setInfo={setInfo} 
            onNext={() => setStep(2)} 
        />
      )}
      
      {step === 2 && (
        <SkillsAssessment 
          info={info} 
          answers={answers} 
          setAnswers={setAnswers} 
          onFinish={calculateAndShowResults} 
        />
      )}

      {step === 3 && (
        <CareerResult 
          score={finalResult.score} 
          sectionScores={sectionScores} 
          recommendation={finalResult} 
          info={info} 
          onReset={() => { setStep(1); setAnswers({}); }} 
        />
      )}
    </div>
  );
}