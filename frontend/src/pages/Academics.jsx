import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Academics() {

    // MOCK DATA, incase the Backend server goes down

    const mockNotices = [
        { id: 1, title: "Hacksagon Finals Schedule", createdAt: "2026-03-17T09:00:00", category: "URGENT", content: "All shortlisted teams must report to the main auditorium by 9:00 AM for the opening ceremony." }
    ];

    const mockResources = [
        { id: 101, title: "Data Structures & Algorithms Syllabus", category: "SYLLABUS", format: "PDF", fileSize: "2.1 MB", url: "#" }
    ];

    // Setup State
    const [notices, setNotices] = useState([]);
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    // Search and Filter State
    const [searchQuery, setSearchQuery] = useState('');
    const [noticeCategory, setNoticeCategory] = useState('ALL');
    const [resourceCategory, setResourceCategory] = useState('ALL');

    // Student Profile State
    const [animatedAttendance, setAnimatedAttendance] = useState(0);
    const studentData = {
        name: "Souvik Chatterjee", // You can swap this with the actual user's name later!
        major: "B.Tech Computer Science",
        semester: "Semester 2",
        cgpa: "8.5",
        attendance: 82, // In Percentage
    };

    useEffect(() => {
        // Triggers the ring animation after the page loads
        setTimeout(() => setAnimatedAttendance(studentData.attendance), 300);
    }, []);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_BASE_URL;
                const token = localStorage.getItem('accessToken');

                const fetchHeaders = {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': 'true',
                    'Content-Type': 'application/json'
                };

                // Fetch 1: Notices
                const noticeResponse = await fetch(`${API_URL}/api/notice/all`, {
                    method: 'GET',
                    headers: fetchHeaders
                });

                if (noticeResponse.ok) {
                    const noticeData = await noticeResponse.json();
                    setNotices(noticeData.content || noticeData || []);

                } else {
                    console.error("Failed to fetch notices:", noticeResponse.status);
                }

                // Fetch 2: Resources
                const resourceResponse = await fetch(`${API_URL}/api/resource/all`, {
                    method: 'GET',
                    headers: fetchHeaders
                });

                if (resourceResponse.ok) {
                    const resourceData = await resourceResponse.json();
                    setNotices(resourceData.content || resourceData || []);

                } else {
                    console.error("Failed to fetch resources:", resourceResponse.status);
                }

            } catch (error) {
                console.error("Network error while fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const getBadgeStyle = (category) => {
        const safeCategory = (category || '').toUpperCase();
        switch (safeCategory) {
            case 'URGENT': return 'bg-red-100 text-red-700';
            case 'ACADEMIC': return 'bg-blue-100 text-blue-700';
            case 'GENERAL': return 'bg-slate-100 text-slate-700';
            case 'SYLLABUS': return 'bg-purple-50 text-purple-600';
            case 'PREVIOUS_PAPERS': return 'bg-indigo-50 text-indigo-600';
            case 'NOTES': return 'bg-violet-50 text-violet-600';
            case 'BOOKS': return 'bg-amber-50 text-amber-700 border border-amber-200';
            case 'LAB': return 'bg-fuchsia-50 text-fuchsia-600';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    const filteredNotices = notices.filter((notice) => {

        const matchesSearch =
            notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            notice.content.toLowerCase().includes(searchQuery.toLowerCase());


        const matchesCategory =
            noticeCategory === 'ALL' ||
            (notice.category || '').toUpperCase() === noticeCategory;

        return matchesSearch && matchesCategory;
    })

    const filteredResources = resources.filter((resource) => {
        return resourceCategory === 'ALL' ||
            (resource.category || '').toUpperCase() === resourceCategory;
    });

    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (animatedAttendance / 100) * circumference;

    return (
        <div>
            <Navbar />

            {/* MAIN LAYOUT */}
            <div className="container mx-auto px-6 py-8 max-w-7xl flex-grow">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* LEFT: NOITCE BOARD */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-4">
                        <h2 className="text-2xl font-extrabold text-slate-800 mb-2 flex items-center gap-2">
                            Notice Board
                        </h2>

                        <div className="flex flex-col sm:flex-row gap-3 mb-4">

                            {/* Search Bar */}
                            <input type="text" placeholder="Search notices..."
                                className="flex-grow px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)} />


                            <select className="px-4 py-2 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                                value={noticeCategory}
                                onChange={(e) => setNoticeCategory(e.target.value)}
                            >
                                <option value="ALL">All Notices</option>
                                <option value="ACADEMIC">Academic</option>
                                <option value="HOSTEL">Hostel</option>
                                <option value="GENERAL">General</option>

                            </select>

                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="flex flex-col divide-y divide-slate-100">
                                {loading ? (
                                    <p className="p-8 text-slate-500 text-center animate-pulse">Loading notices...</p>
                                ) : notices.length === 0 ? (
                                    <p className="p-8 text-slate-500 text-center">No new notices at this time.</p>
                                ) : (
                                    // ADDED INDEX FALLBACK HERE
                                    filteredNotices.map((notice, index) => (
                                        <div key={index} className="p-5 hover:bg-slate-50 transition">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className={`text-xs font-bold px-2 py-1 rounded-full capitalize lowercase ${getBadgeStyle(notice.category)}`}>
                                                    {notice.category ? notice.category.replace('_', ' ') : 'Notice'}
                                                </span>
                                                <span className="text-xs text-slate-500 font-medium">
                                                    {notice.createdAt ? new Date(notice.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Today'}
                                                </span>
                                            </div>
                                            <h3 className="font-bold text-slate-800 text-lg mb-1">{notice.title}</h3>
                                            <p className="text-sm text-slate-600 leading-relaxed">{notice.content}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>


                    {/* RIGHT: RESOURCE HUB */}
                    <div className="w-full lg:w-2/3 flex flex-col gap-4">
                        <div className="flex justify-between items-end mb-2">
                            <h2 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
                                Resource Hub
                            </h2>
                            <select
                                className="text-sm font-medium text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                                value={resourceCategory}
                                onChange={(e) => setResourceCategory(e.target.value)}
                            >
                                <option value="ALL">All Resources</option>
                                <option value="SYLLABUS">Syllabus</option>
                                <option value="PREVIOUS_PAPERS">Previous Papers</option>
                                <option value="NOTES">Notes</option>
                                <option value="BOOKS">Books</option>
                                <option value="LAB">Lab Manuals</option>
                                <option value="ACADEMIC">Academics</option>
                            </select>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            {loading ? (
                                <p className="col-span-1 md:col-span-2 p-8 text-slate-500 text-center animate-pulse bg-white rounded-2xl border border-slate-200">Loading resources...</p>
                            ) : resources.length === 0 ? (
                                <p className="col-span-1 md:col-span-2 p-8 text-slate-500 text-center bg-white rounded-2xl border border-slate-200">No resources available.</p>
                            ) : (
                                // INDEX FALLBACK HERE
                                filteredResources.map((resource, index) => (
                                    <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition group cursor-pointer flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-3">
                                                <span className={`text-xs font-bold px-2 py-1 rounded-md capitalize lowercase ${getBadgeStyle(resource.category)}`}>
                                                    {resource.category ? resource.category.replace('_', ' ') : 'Resource'}
                                                </span>
                                                <span className="text-xs font-semibold text-slate-400">
                                                    {resource.format} • {resource.fileSize}
                                                </span>
                                            </div>
                                            <h3 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition">
                                                {resource.title}
                                            </h3>
                                        </div>
                                        <div className="mt-6 flex justify-end">
                                            <a
                                                href={resource.url || '#'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm font-semibold text-white bg-slate-800 hover:bg-indigo-600 px-4 py-2 rounded-lg transition-colors inline-block"
                                            >
                                                Download
                                            </a>
                                        </div>
                                    </div>
                                ))

                            )
                            }

                        </div>

                    </div>

                </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-8 mb-8">

                {/* Animated Attendance Ring */}
                <div className="relative flex items-center justify-center">
                    <svg className="transform -rotate-90 w-40 h-40">
                        <circle cx="80" cy="80" r={radius} stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                        <circle
                            cx="80" cy="80" r={radius}
                            stroke="currentColor" strokeWidth="12" fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            className={`${animatedAttendance >= 75 ? 'text-indigo-600' : 'text-rose-500'} transition-all duration-1000 ease-out`}
                        />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                        <span className="text-3xl font-extrabold text-slate-800">{animatedAttendance}%</span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Attendance</span>
                    </div>
                </div>

                {/* Student Info */}
                <div className="flex-grow text-center md:text-left">
                    <h2 className="text-2xl font-bold text-slate-800">{studentData.name}</h2>
                    <p className="text-indigo-600 font-semibold mb-4">{studentData.major} • {studentData.semester}</p>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 inline-block">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Current CGPA</p>
                        <p className="text-2xl font-extrabold text-slate-800">{studentData.cgpa} <span className="text-sm text-slate-400 font-medium">/ 10.0</span></p>
                    </div>
                </div>
            </div>

        </div>
    );

}