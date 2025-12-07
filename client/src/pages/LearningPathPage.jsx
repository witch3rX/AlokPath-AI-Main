// client/src/pages/LearningPathPage.jsx
import React, { useState } from 'react';
import CourseInput from '../components/CourseInput';
import TopicSelection from '../components/TopicSelection';
import AnalyzeResult from '../components/AnalyzeResult';

export default function LearningPathPage() {
  const [step, setStep] = useState(1);
  const [courses, setCourses] = useState(null);
  const [prepared, setPrepared] = useState(null);

  return (
    <div>
      {step === 1 && <CourseInput onDone={(c)=>{ setCourses(c); setStep(2); }} />}
      {step === 2 && <TopicSelection courses={courses} onSubmit={(prep)=>{ setPrepared(prep); setStep(3); }} />}
      {step === 3 && <AnalyzeResult preparedCourses={prepared} />}
    </div>
  );
}
