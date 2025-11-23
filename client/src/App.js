import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import './index.css'; 

// Import all the pages
import HomePage from './pages/HomePage';
import CareerAdvisorPage from './pages/CareerAdvisorPage';
import ComingSoonPage from './pages/ComingSoonPage';

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
          <Route path="feature-3" element={<ComingSoonPage featureName="Feature 3 (M3)" />} />
          <Route path="feature-4" element={<ComingSoonPage featureName="Feature 4 (M4)" />} />
          <Route path="feature-5" element={<ComingSoonPage featureName="Feature 5 (M5)" />} />
          <Route path="login" element={<ComingSoonPage featureName="Login System (M6)" />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;