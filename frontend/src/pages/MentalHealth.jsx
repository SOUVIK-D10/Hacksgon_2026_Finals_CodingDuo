import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

export default function MentalHealth() {

    // Mock Data
    const counselors = [
        { id: 1, name: "Dr. Anita Sharma", specialty: "Stress & Anxiety Management", availability: "Today, 4:00 PM", initial: "A" },
        { id: 2, name: "Dr. Rajesh Kumar", specialty: "Academic Pressure & Career Counseling", availability: "Tomorrow, 10:00 AM", initial: "R" },
        { id: 3, name: "Ms. Priya Singh", specialty: "General Well-being & Adjustment", availability: "Wed, 2:30 PM", initial: "P" }
    ];

    const [bookingMessage, setBookingMessage] = useState('')
    const [journalEntry, setJournalEntry] = useState('')

    const [isSosLoading, setIsSosLoading] = useState(false);
    const [sosMessage, setSosMessage] = useState('');

    const [setselectedCounselor, setSetselectedCounselor] = useState(null);

    const handleSOSAlert = () => {
        setIsSosLoading(true);
        setSosMessage('');

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {

                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                console.log(`SOS Triggered! Location: Lat ${lat}, Lng ${lng}`);

                try {

                    const token = localStorage.getItem('accessToken');
                    const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

                    const response = await fetch(`${apiUrl}/api/sos`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                            'ngrok-skip-browser-warning': 'true'
                        },
                        body: JSON.stringify({
                            latitude: lat.toString(),
                            longitude: lng.toString()
                        })


                    })

                    if (response.ok) {
                        setSosMessage(`🚨 SOS Alert Sent! Campus Security has been notified of your exact location (Lat: ${lat.toFixed(3)}, Lng: ${lng.toFixed(3)}).`);
                        setTimeout(() => setSosMessage(''), 10000);
                    }
                    else {
                        throw new Error("Backend returned an error status: " + response.status);
                    }
                } catch (error) {
                    console.error("SOS Fetch Error:", error);
                    setIsSosLoading(false);
                    alert("Failed to send SOS to the server. Please call security directly.");
                }



            }, (error) => {
                console.error("Location access denied.", error);
                setIsSosLoading(false);
                alert("Please enable browser location services so security can find you!");
            }, {
                enableHighAccuracy: true
            });
        } else {
            setIsSosLoading(false);
            alert("Your browser does not support Geolocation.");
        }
    };


    return (
        <div className="bg-slate-50 min-h-screen font-sans flex flex-col">

            <Navbar />

            {/* MAIN CONTENT */}
            <div className="container mx-auto px-6 py-8 max-w-5xl flex-grow">

                <div className="text-center mb-10">

                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">You are not alone.</h1>

                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">College can be overwhelming. Whether you're dealing with academic stress, anxiety or just need someone to talk to, our confidential resources are here to help you.</p>
                </div>

                {/* THE DASHBOARD (SOS, Decompression, Cards) */}

                <div className='animate-fade-in'>

                    {/* SOS Alert Box */}
                    <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 mb-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 transition-all">
                        <div>
                            <h3 className="text-xl font-bold text-rose-800 mb-1">Need Immediate Help?</h3>
                            <p className="text-rose-600 font-medium">Trigger an SOS to securely send your live location to Campus Security.</p>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={handleSOSAlert}
                                disabled={isSosLoading}
                                className={`font-bold py-3 px-6 rounded-xl transition shadow-sm w-full sm:w-auto ${isSosLoading
                                    ? 'bg-rose-400 cursor-wait text-white'
                                    : 'bg-rose-600 hover:bg-rose-700 text-white'
                                    }`}
                            >
                                {isSosLoading ? '📍 Locating GPS...' : '🚨 Trigger Emergency SOS'}
                            </button>
                        </div>
                    </div>


                    {/* Dynamic SOS Success Message */}
                    {sosMessage && (
                        <div className="bg-rose-600 border border-rose-800 text-white p-4 rounded-xl mb-10 font-bold shadow-md animate-pulse text-center">
                            {sosMessage}
                        </div>
                    )}


                    {/* DECOMPRESSION ZONE */}
                    <div className={`${sosMessage ? 'mt-0' : 'mt-10'} mb-12`}>
                        <h2>Decompression Zone</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Breathing Exercise Card */}
                            <div className=''>
                                <h3>Take a moment.</h3>
                                <p>Breathe in as the circle expands. Breathe out as it contracts.</p>

                                <div className="relative flex justify-center items-center h-40 mb-4">
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.8, 1],
                                            opacity: [0.3, 0.7, 0.3]
                                        }}
                                        transition={{
                                            duration: 8,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="absolute w-28 h-28 bg-emerald-200 rounded-full"
                                    />
                                    <div className="absolute w-14 h-14 bg-emerald-500 rounded-full shadow-lg z-10 flex items-center justify-center text-white text-[10px] font-bold tracking-widest">
                                        FOCUS
                                    </div>
                                </div>
                            </div>

                            {/* Private Journal Card */}
                            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col">
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Private Reflection</h3>
                                <p className="text-sm text-slate-500 mb-4">Get it out of your head. This log is local, private, and clears when you leave.</p>
                                <textarea
                                    className="flex-grow w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                                    placeholder="What's on your mind today?"
                                    value={journalEntry}
                                    onChange={(e) => setJournalEntry(e.target.value)}
                                ></textarea>
                                <div className="flex justify-end mt-4">
                                    <button
                                        onClick={() => setJournalEntry('')}
                                        className="text-sm font-semibold text-slate-400 hover:text-rose-500 transition-colors"
                                    >
                                        Clear Entry
                                    </button>
                                </div>
                            </div>


                        </div>
                    </div>


                </div>


            </div>

        </div>
    )


}

