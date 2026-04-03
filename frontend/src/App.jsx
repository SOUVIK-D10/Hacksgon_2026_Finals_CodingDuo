import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard';
import Academics from './pages/Academics';
import Grievances from './pages/Grievances';
import MentalHealth from './pages/MentalHealth';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* The "/" path is the very first thing the user sees */}
        <Route path="/" element={<LandingPage />} />


        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/grievances" element={<Grievances />} />
        <Route path="/mental-health" element={<MentalHealth />} /> */}

      </Routes>
    </Router>
  );
}