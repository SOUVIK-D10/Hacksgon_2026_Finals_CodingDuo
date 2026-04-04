import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Grievances from './pages/Grievances';
import Academics from './pages/Academics';
import MentalHealth from './pages/MentalHealth';
import AdminLayout from './components/AdminLayout';
import AdminInbox from './components/AdminInbox';
import AdminBroadcast from './components/AdminBroadcast';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/grievances" element={<Grievances />} />
        <Route path="/mental-health" element={<MentalHealth />} />
        <Route path="/admin/inbox" element={
          <AdminLayout>
            <AdminInbox />
          </AdminLayout>
        } />
        <Route path="/admin/broadcast" element={
          <AdminLayout>
            <AdminBroadcast />
          </AdminLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;