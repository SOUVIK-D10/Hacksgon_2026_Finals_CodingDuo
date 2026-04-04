import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Grievances from './pages/Grievances';
import Academics from './pages/Academics';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/grievances" element={<Grievances />} />
      </Routes>
    </Router>
  );
}

export default App;