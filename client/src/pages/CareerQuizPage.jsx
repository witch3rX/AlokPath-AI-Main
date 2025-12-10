import React, { useState } from 'react';
import axios from 'axios';
import QuizSetup from '../components/quiz/QuizSetup';
import QuizInterface from '../components/quiz/QuizInterface';
import QuizResult from '../components/quiz/QuizResult';

const CareerQuizPage = () => {
  const [step, setStep] = useState('setup'); // setup | quiz | result
  const [loading, setLoading] = useState(false);
  
  // Data
  const [name, setName] = useState('');
  const [career, setCareer] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  // --- 1. FETCH QUESTIONS (This is where your fix goes) ---
  const handleStartQuiz = async () => {
    if (!career) {
      alert("Please select a career path.");
      return;
    }
    
    setLoading(true);
    try {
      console.log(`Fetching questions for: ${career}`);
      
      // ✅ THIS IS THE CODE YOU WANTED TO ADD:
      // Ensure the port is 5000 (your server), not 3000 (your client)
      const res = await axios.get(`https://alokpath-ai.onrender.com/api/quiz/questions?career=${career}`);
      
      console.log("Questions loaded:", res.data);
      setQuestions(res.data);
      setStep('quiz');
    } catch (err) {
      console.error("Error details:", err);
      alert("Error fetching questions. Please make sure your Backend Server is running on Port 5000.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Answer Selection
  const handleAnswer = (questionId, option) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  // 3. Submit Quiz
  const handleSubmit = async () => {
    setLoading(true);
    try {
      // ✅ Ensure this URL also points to port 5000
      const res = await axios.post('https://alokpath-ai.onrender.com/api/quiz/submit', {
        studentName: name,
        career: career,
        answers: answers
      });
      setResult(res.data);
      setStep('result');
    } catch (err) {
      console.error(err);
      alert("Error submitting quiz.");
    } finally {
      setLoading(false);
    }
  };

  // 4. Reset / Retake
  const handleRetake = () => {
    setStep('setup');
    setAnswers({});
    setResult(null);
    setCareer('');
    setName('');
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] flex items-center justify-center p-4">
      {/* Optional Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-900 rounded-full blur-[100px] opacity-20"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-cyan-900 rounded-full blur-[100px] opacity-20"></div>
      </div>

      <div className="z-10 w-full flex justify-center">
        {step === 'setup' && (
          <QuizSetup 
            name={name} setName={setName}
            career={career} setCareer={setCareer}
            onStart={handleStartQuiz}
            loading={loading}
          />
        )}

        {step === 'quiz' && (
          <QuizInterface 
            questions={questions}
            answers={answers}
            handleAnswer={handleAnswer}
            onSubmit={handleSubmit}
            loading={loading}
          />
        )}

        {step === 'result' && result && (
          <QuizResult 
            result={result}
            onRetake={handleRetake}
          />
        )}
      </div>
    </div>
  );
};

export default CareerQuizPage;