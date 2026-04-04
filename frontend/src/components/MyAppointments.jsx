import { dimensionValueTypes } from "framer-motion";
import React, { useState, useEffect } from "react";

export default function MyAppointments() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {

        const fetchHistory = async () => {
            try {

                const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
                const token = localStorage.getItem('accessToken');

                const response = await fetch(`${API_URL}/api/wellbeing/appointment/my-history`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'ngrok-skip-browser-warning': 'true' // Helpful if using ngrok
                    }
                });

                if (!response.ok) throw new Error("Failed to fetch appointments");

                const data = await response.json();

                // Assuming his backend sends the exact JSON array we talked about:
                setAppointments(data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchHistory();

    }, [])

    const clearHistory = () => {
        localStorage.removeItem('hackathonAppointments');
        setAppointments([]);
    }

    return (

        <div>

            <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-4">
                <div>
                    <h2 className="text-2xl font-extrabold text-slate-800">My Appointments</h2>
                    <p className="text-slate-500 font-medium mt-1">Manage your upcoming confidential sessions.</p>
                </div>
                {appointments.length > 0 && (
                    <button
                        onClick={clearHistory}
                        className="text-sm font-semibold text-rose-500 hover:text-rose-700 transition"
                    >
                        Clear History (Demo Only)
                    </button>
                )}
            </div>

            {appointments.length === 0 ? (
                // EMPTY STATE
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center">
                    <div className="text-4xl mb-4">📅</div>
                    <h3 className="text-lg font-bold text-slate-700 mb-2">No upcoming sessions</h3>
                    <p className="text-slate-500 max-w-sm mx-auto">
                        You don't have any appointments booked right now. Your well-being is a priority—feel free to schedule a chat whenever you need it.
                    </p>
                </div>
            ) : (
                // APPOINTMENT LIST
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {appointments.map((apt) => (
                        <div key={apt.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition relative overflow-hidden">

                            {/* Green Accent Line */}
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-teal-500"></div>

                            <div className="flex justify-between items-start mb-4 pl-2">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">{apt.counselorName}</h3>
                                    <p className="text-sm font-medium text-teal-600">{apt.specialty}</p>
                                </div>
                                <span className="bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-full border border-teal-100">
                                    {apt.status}
                                </span>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 pl-6 relative">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Date</p>
                                        <p className="text-sm font-semibold text-slate-800">
                                            {new Date(apt.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Time</p>
                                        <p className="text-sm font-semibold text-slate-800">{apt.time}</p>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-slate-200">
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Reason</p>
                                    <p className="text-sm text-slate-600">{apt.category.replace('_', ' ')}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}