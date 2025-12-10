import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import './index.css'; 
import LearningPathPage from "./pages/LearningPathPage";


// Import all the pages
import HomePage from './pages/HomePage';
import CareerAdvisorPage from './pages/CareerAdvisorPage';
import CareerPage from './pages/CareerPage';                 // M3 (The file in your screenshot is named CareerPage.jsx)               // M3 (Your Renamed File)
import ComingSoonPage from './pages/ComingSoonPage';
import CareerQuizPage from './pages/CareerQuizPage'; // m4

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The Layout component wraps every page with the Header and Navbar */}
        <Route path="/" element={<Layout />}>
          
          {/* Your main pages */}
          <Route index element={<HomePage />} />
          <Route path="career-advisor" element={<CareerAdvisorPage />} />
          
          {/* Placeholders for your team */}
          <Route path="feature-2" element={<ComingSoonPage featureName="Feature 2 (M2)" />} />
{/* M3: Your New Career Page  */}
          <Route path="feature-3" element={<CareerPage />} />
          <Route path="/learning-path" element={<LearningPathPage />} />
          <Route path="feature-3" element={<ComingSoonPage featureName="Feature 3 (M3)" />} />
          <Route path="/assessment" element={<CareerQuizPage />} />
          <Route path="feature-5" element={<ComingSoonPage featureName="Feature 5 (M5)" />} />
          <Route path="login" element={<ComingSoonPage featureName="Login System (M6)" />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;