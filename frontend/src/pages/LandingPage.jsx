import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div className='min-h-screen bg-slate-50'>
            <Navbar title="Welcome to SupportHub" />
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-4xl font-bold text-slate-800">Landing Page is working!</h1>
            </div>
        </div>
    );
}

function Navbar({
    title = "Unified Student Support Platform",
    icon = null,
    backLink = null, 
    backText = "Back",
    themeColor = "slate",
    rightElement = null
}) {
  const getThemeText = () => {
    switch(themeColor) {
      case 'amber': return 'text-amber-600';
      case 'emerald': return 'text-emerald-600';
      case 'indigo': return 'text-indigo-600';
      default: return 'text-slate-800';
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-6 max-w-7xl h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className={`text-lg font-black tracking-tight ${getThemeText()}`}>{title}</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Student Portal</span>
        </div>
      </div>
    </nav>
  );
}