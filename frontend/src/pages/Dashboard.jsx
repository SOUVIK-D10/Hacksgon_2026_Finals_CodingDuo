import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    return (
        <div className='bg-slate-50 min-h-screen font-sans flex flex-col'>

            <Navbar
                rightElement={
                    <button
                        onClick={() => {
                            // Your logout logic here (e.g., clearing localStorage)
                            localStorage.removeItem('accessToken');
                            window.location.href = '/login';
                        }}
                        className="text-red-500 hover:text-red-700 transition"
                    >
                        Log Out
                    </button>
                }
            />

            {/* SEPARATOR */}
            <div className="h-px bg-slate-200 w-full mb-12"></div>

            {/* MAIN CONTENT */}

            <div className="container mx-auto px-6 max-w-6xl flex-grow">

                <h1 className="text-center text-4xl md:text-5xl text-slate-900 font-extrabold mb-16 tracking-tight">
                    Student Dashboard
                </h1>

                <div className="flex flex-col md:flex-row gap-8 pb-16">

                    {/* LEFT CARD: Academics */}
                    <Link
                        to="/academics"
                        className="block bg-indigo-50 p-10 flex-1 rounded-3xl shadow-sm border border-indigo-100 hover:shadow-xl hover:border-indigo-300 transition-all transform hover:-translate-y-2"
                    >
                        <h2 className="font-extrabold text-3xl text-indigo-900 text-center mb-4">
                            Academics
                        </h2>
                        <p className="text-slate-700 text-lg leading-relaxed text-center">
                            Access all your academic resources in one place. View course materials, track attendance, check grades, and stay updated with announcements.
                        </p>
                    </Link>

                    {/* MIDDLE CARD: Grievance */}
                    <Link
                        to="/grievances"
                        className="block bg-amber-50 p-10 flex-1 rounded-3xl shadow-sm border border-amber-100 hover:shadow-xl hover:border-amber-300 transition-all transform hover:-translate-y-2"
                    >
                        <h2 className="font-extrabold text-3xl text-amber-900 text-center mb-4">
                            Grievance
                        </h2>
                        <p className="text-slate-700 text-lg leading-relaxed text-center">
                            Raise academic or administrative grievances easily and track their progress in real time. Stay informed with transparent status updates until resolution.
                        </p>
                    </Link>

                    {/* RIGHT CARD: Mental Health */}
                    <Link
                        to="/mental-health"
                        className="block bg-emerald-50 p-10 flex-1 rounded-3xl shadow-sm border border-emerald-100 hover:shadow-xl hover:border-emerald-300 transition-all transform hover:-translate-y-2"
                    >
                        <h2 className="font-extrabold text-3xl text-emerald-900 text-center mb-4">
                            Mental Health
                        </h2>
                        <p className="text-slate-700 text-lg leading-relaxed text-center">
                            Find confidential mental health resources and support services. Access guidance, counselling options, and well-being tools in a safe, stigma-free environment.
                        </p>
                    </Link>


                </div>
            </div>
        </div>
    );
}