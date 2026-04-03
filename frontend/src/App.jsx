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
        {/* Default route redirects to Dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Main Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/grievances" element={<Grievances />} />
        
        {/* 404 Catch-All */}
        <Route path="*" element={<div className="p-10 text-center text-2xl font-bold">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}