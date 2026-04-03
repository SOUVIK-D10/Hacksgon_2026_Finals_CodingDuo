import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function LandingPage() {
  return (
    <div className="bg-slate-50 text-slate-900 scroll-smooth min-h-screen flex flex-col font-sans">


      <Navbar
        // Title defaults to "Unified Student Support Platform" so we don't need to pass it
        rightElement={
          <>
            <a href="#about" className="text-slate-600 hover:text-slate-900 transition">About</a>
            <a href="#features" className="text-slate-600 hover:text-slate-900 transition">Features</a>
            <Link to="/login" className="text-slate-600 hover:text-slate-900 transition">Login</Link>
          </>
        }
      />

      {/* SEPARATOR */}
      <div className="h-px bg-slate-200 w-full"></div>

      {/* HERO SECTION */}
      <div className="container mx-auto px-6 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Unified Student Support Platform
          </h1>
          <p className="text-xl md:text-2xl font-medium text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            One platform for academics, grievances, and mental well-being
          </p>
          <div className="flex justify-center">
            <Link to="/login">
              <button className="bg-green-500 hover:bg-green-600 text-white text-2xl font-semibold px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section id="about" className="max-w-6xl mx-auto mt-10 mb-20 px-6 scroll-mt-24">
        <div className="flex flex-col md:flex-row gap-8">

          {/* The Problem Card */}
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-8 flex-1 shadow-sm hover:shadow-md transition-shadow duration-200">
            <h3 className="text-2xl font-bold text-sky-900 mb-4">The Problem</h3>
            <ul className="list-disc pl-6 space-y-3 text-slate-700 text-lg">
              <li>Students rely on multiple disconnected systems for academics, complaints, and support</li>
              <li>Grievance resolution often requires physical office visits and repeated follow-ups</li>
              <li>Lack of transparency leaves students unsure about complaint status</li>
              <li>Privacy concerns discourage students from seeking mental health support</li>
            </ul>
          </div>

          {/* The Solution Card */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 flex-1 shadow-sm hover:shadow-md transition-shadow duration-200">
            <h3 className="text-2xl font-bold text-emerald-900 mb-4">Our Solution</h3>
            <ul className="list-disc pl-6 space-y-3 text-slate-700 text-lg">
              <li>A single unified platform for all student support needs</li>
              <li>Digital grievance submission and tracking with clear status updates</li>
              <li>Centralized access to academic information and services</li>
              <li>Privacy-conscious mental health resources to reduce hesitation and stigma</li>
            </ul>
          </div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="max-w-6xl mx-auto mt-10 mb-24 px-6 scroll-mt-24">
        <h2 className="text-center text-4xl font-extrabold text-slate-900 mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 border-t-4 border-t-blue-500 hover:shadow-xl transition-all transform hover:-translate-y-1">
            <h3 className="text-xl font-bold text-slate-800 mb-3">Academic Access</h3>
            <p className="text-slate-600 leading-relaxed">
              Centralized access to academic information, updates, and essential student services in one place.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 border-t-4 border-t-blue-500 hover:shadow-xl transition-all transform hover:-translate-y-1">
            <h3 className="text-xl font-bold text-slate-800 mb-3">Grievance Redressal</h3>
            <p className="text-slate-600 leading-relaxed">
              Submit grievances digitally, track their status transparently, and reduce the need for repeated follow-ups.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 border-t-4 border-t-blue-500 hover:shadow-xl transition-all transform hover:-translate-y-1">
            <h3 className="text-xl font-bold text-slate-800 mb-3">Mental Health Support</h3>
            <p className="text-slate-600 leading-relaxed">
              Access mental health resources privately, helping students seek support without fear or stigma.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="font-bold text-white text-xl mb-2 md:mb-0">
            Unified Student Support Platform
          </div>
          <div className="text-sm">
            Built by <span className="text-blue-400 font-semibold">CodingDuo</span>
          </div>
        </div>
      </footer>

    </div>
  );
}