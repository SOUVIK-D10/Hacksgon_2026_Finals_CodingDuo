import React, { useState, useEffect } from 'react';

export default function MyAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMyHistory = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_BASE_URL;
                const token = localStorage.getItem('accessToken');

                const response = await fetch(`${API_URL}/api/wellbeing/appointment/my-history`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'ngrok-skip-browser-warning': 'true'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    
                    // This line handles both.
                    const finalData = Array.isArray(data) ? data : (data.content || []);
                    setAppointments(finalData);
                    
                    console.log("Verified Backend Data:", finalData);
                } else {
                    setError('Failed to load appointments.');
                }
            } catch (err) {
                console.error("Fetch error:", err);
                setError('Could not connect to the server.');
            } finally {
                setLoading(false);
            }
        };

        fetchMyHistory();
    }, []);

    if (loading) return <div className="p-4 text-slate-500 animate-pulse">Checking your schedule...</div>;
    if (error) return <div className="p-4 text-rose-500">{error}</div>;
    if (appointments.length === 0) return null;

    return (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-extrabold text-slate-800 mb-6 flex items-center gap-2">
                Your Sessions
            </h2>

            <div className="space-y-4">
                {appointments.map((apt, index) => (
                    <div key={index} className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 gap-4">
                        
                        <div>
                            {/* Entity has counselorId, not name, so we use a fallback */}
                            <h3 className="font-bold text-slate-800 text-lg">
                                Counseling Session
                            </h3>
                            
                            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm font-medium text-slate-500">
                                {/* FIX: Using his EXACT Java fields appointmentDate and appointmentTime */}
                                <span className="flex items-center gap-1">
                                    📅 {apt.date || 'Date TBD'}
                                </span>
                                <span className="flex items-center gap-1">
                                    🕒 {apt.time || 'Time TBD'}
                                </span>
                                
                                <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                                    apt.status === 'CONFIRMED' || apt.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                }`}>
                                    {apt.status || 'PENDING'}
                                </span>
                            </div>
                        </div>

                        <div className="flex-shrink-0">
                            {/* FIX: Ensuring meetLink logic is solid */}
                            {apt.meetLink && apt.meetLink.startsWith('http') ? (
                                <a 
                                    href={apt.meetLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md shadow-indigo-500/20"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
                                    Join Meet
                                </a>
                            ) : (
                                <div className="text-sm font-bold text-slate-400 bg-slate-100 px-4 py-3 rounded-xl border border-dashed border-slate-300">
                                    Link Pending...
                                </div>
                            )}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}