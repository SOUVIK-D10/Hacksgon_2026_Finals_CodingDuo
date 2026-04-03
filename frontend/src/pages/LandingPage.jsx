import React from 'react';
import Navbar from '../components/Navbar'; // Direct path, no curly braces

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar title="Student Support Platform" />
      <main className="flex flex-col items-center justify-center pt-20">
        <h1 className="text-4xl font-black text-slate-900">It's Alive!</h1>
        <p className="mt-4 text-slate-600">Fresh start, zero errors.</p>
      </main>
    </div>
  );
}