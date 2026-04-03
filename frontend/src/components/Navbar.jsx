// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ 
  title = "Unified Student Support Platform", // Default title matches your screenshots
  icon = null, 
  backLink = "/dashboard", 
  backText = "Back to Dashboard",
  themeColor = "slate", 
  rightElement = null // NEW PROP: Accepts custom JSX
}) {
  
  const colorClasses = {
    slate: "text-slate-600 hover:text-slate-800 border-slate-100",
    indigo: "text-indigo-600 hover:text-indigo-800 border-indigo-100",
    teal: "text-teal-600 hover:text-teal-800 border-teal-100",
    amber: "text-amber-600 hover:text-amber-800 border-amber-100",
  };

  const currentTheme = colorClasses[themeColor] || colorClasses.slate;

  return (
    <nav className="bg-white flex justify-between items-center px-6 md:px-10 py-5 shadow-sm sticky top-0 z-50 border-b border-slate-100">
      
      {/* Title Section */}
      <div className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-tight flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {title}
      </div>

      {/* Dynamic Right Side */}
      <div className="flex items-center gap-6 font-semibold text-base">
        {rightElement ? (
          /* Render custom links/buttons if they are passed in */
          rightElement
        ) : (
          /* Fallback to standard "Back" link for internal pages */
          <Link
            to={backLink}
            className={`transition whitespace-nowrap text-right ${currentTheme.split(' ').slice(0, 2).join(' ')}`}
          >
            <span className="inline sm:hidden">&larr; Back</span>
            <span className="hidden sm:inline">&larr; {backText}</span>
          </Link>
        )}
      </div>
    </nav>
  );
}