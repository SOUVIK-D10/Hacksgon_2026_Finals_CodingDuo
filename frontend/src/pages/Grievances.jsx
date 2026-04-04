import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Grievances() {
    const [tickets, setTickets] = useState([])

    // Form State
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')

    // Loading State
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isAutoTagging, setIsAutoTagging] = useState(false)

    // Filters
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('ALL')
    const [categoryFilter, setCategoryFilter] = useState('ALL')

    useEffect(() => {
        const fetchMyTickets = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_BASE_URL;
                const token = localStorage.getItem('accessToken');

                if (!token) return;
                const response = await fetch(`${API_URL}/api/ticket/all?size=50`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'ngrok-skip-browser-warning': 'true'
                    }

                })

                if (response.ok) {
                    const data = await response.json();

                    let fetchedTickets = [];
                    if (data.content && Array.isArray(data.content)) {
                        fetchedTickets = data.content;
                    } else if (Array.isArray(data)) {
                        fetchedTickets = data;
                    }

                    console.log("🔥 EXACT DATA FROM JAVA BACKEND:", fetchedTickets);
                    setTickets(fetchedTickets);
                } else {
                    console.error("Failed to fetch tickets. Status:", response.status);
                }
            } catch (err) {
                console.error("Connection error", err);
            }
        };

        fetchMyTickets();
    }, []);

    const handleAutoTag = async () => {
        if (!title || !description) {
            alert("Please enter a title and description first so the AI has context!");
            return;
        }

        setIsAutoTagging(true);

        try {
            const API_URL = import.meta.env.VITE_API_BASE_URL;
            const token = localStorage.getItem('accessToken');

            const response = await fetch(`${API_URL}/api/ticket/categorize`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify({ title, content: description })
            });

            if (response.ok) {
                const rawText = await response.text();
                console.log("Groq says:", rawText);

                try {
                    const jsonData = JSON.parse(rawText);
                    setCategory(jsonData.suggestedCategory || jsonData.category || rawText);
                } catch (parseError) {
                    setCategory(rawText.trim());
                }
            }
            else {
                alert("AI suggestion failed. You can still select manually.")
            }
        } catch (err) {
            console.error("AI connection error:", err);
        } finally {
            setIsAutoTagging(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !category) {
            alert("Please fill out all fields or use the AI to select a category!");
            return;
        }

        setIsSubmitting(true);

        try {
            const API_URL = import.meta.env.VITE_API_BASE_URL;
            const token = localStorage.getItem('accessToken');

            const ticketPayload = {
                title: title,
                category: category,
                content: description,
                status: "OPEN"
            };

            const response = await fetch(`${API_URL}/api/ticket/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify(ticketPayload)
            });

            if (response.ok) {
                const newTicket = await response.json();
                setTitle("");
                setCategory("");
                setDescription("");

                setTickets((prevTickets) => [newTicket, ...prevTickets]);

            }
            else {
                alert("Something went wrong saving the ticket.");
            }
        } catch (err) {
            console.error("Connection error:", err);
        } finally {
            setIsSubmitting(false);
        }
    }

    const filteredTickets = tickets.filter((ticket) => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = !searchQuery ||
            (ticket.title && ticket.title.toLowerCase().includes(searchLower)) ||
            (ticket.content && ticket.content.toLowerCase().includes(searchLower)) ||
            (ticket.description && ticket.description.toLowerCase().includes(searchLower));

        const matchesStatus =
            statusFilter === 'ALL' || (statusFilter === 'OPEN' && ticket.status && ['OPEN', 'SUBMITTED', 'UNDER REVIEW', 'UNDER_REVIEW', 'PENDING'].includes(ticket.status.toUpperCase())) || (statusFilter !== 'OPEN' && ticket.status && ticket.status.toUpperCase() === statusFilter);

        const matchesCategory =
            categoryFilter === 'ALL' ||
            (ticket.category && ticket.category.toUpperCase() === categoryFilter);

        return matchesSearch && matchesStatus && matchesCategory;

    });

    return (
        <div className="bg-slate-50 min-h-screen font-sans flex flex-col">
            <Navbar title="Grievance Redressal" icon="📢" themeColor="indigo" />

            <div className="container mx-auto px-6 py-8 max-w-7xl flex-grow">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* LEFT COLUMN: Submission Form */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-4">
                        <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Raise a Ticket</h2>
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <form onSubmit={handleSubmit} className='space-y-5'>
                                <div>
                                    <label className=''>Issue Title</label>
                                    <input type="text"
                                        required
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
                                    <textarea
                                        required
                                        rows="4"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition resize-none"
                                    ></textarea>

                                    <div className="mt-2 flex justify-end">
                                        <button
                                            type="button"
                                            onClick={handleAutoTag}
                                            disabled={isAutoTagging || !title || !description}
                                            className="text-sm px-3 py-1.5 bg-indigo-50 text-indigo-600 font-semibold rounded-lg border border-indigo-200 hover:bg-indigo-100 transition disabled:opacity-50 flex items-center gap-1"
                                        >
                                            {isAutoTagging ? '✨ Analyzing...' : '✨ Auto-suggest Category'}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
                                    <select
                                        required
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition ${category ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-medium' : 'bg-white border-slate-300'
                                            }`}
                                    >
                                        <option value="" disabled>Select a category...</option>
                                        <option value="ACADEMIC_ISSUES">Academic</option>
                                        <option value="HOSTEL_MANAGEMENT">Hostel & Mess</option>
                                        <option value="TECHNICAL_SUPPORT">IT & Network</option>
                                        <option value="FACILITY_MAINTENANCE">Maintenance</option>
                                        <option value="ADMINISTRATIVE_DELAY">Admin Delay</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                    {category && (
                                        <p className="text-xs text-slate-500 mt-1">
                                            You can change this if the AI got it wrong.
                                        </p>
                                    )}
                                </div>

                                <button type='submit'
                                    disabled={isSubmitting}
                                    className='className="w-full bg-amber-500 hover:bg-amber-600 text-white
                                    text-sm font-bold py-3 rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-70'>
                                    {isSubmitting ? 'Submitting...' : 'Submit Grievance'}
                                </button>


                            </form>
                        </div>


                    </div>

                    {/* RIGHT COLUMN */}
                    <div>
                        <h2>My Tickets</h2>
                        {/* Filters */}
                        <div>
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4">
                                <input
                                    type="text"
                                    placeholder="Search keywords..."
                                    className="flex-grow px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow bg-slate-50"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <div className="flex gap-4">
                                    <select
                                        className="px-4 py-2 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer font-medium text-slate-700"
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                    >
                                        <option value="ALL">All Statuses</option>
                                        <option value="OPEN">Open</option>
                                        <option value="SOLVED">Solved</option>
                                    </select>

                                    <select
                                        className="px-4 py-2 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer font-medium text-slate-700"
                                        value={categoryFilter}
                                        onChange={(e) => setCategoryFilter(e.target.value)}
                                    >
                                        <option value="ALL">All Categories</option>
                                        <option value="TECHNICAL_SUPPORT">IT & Network</option>
                                        <option value="HOSTEL_MANAGEMENT">Hostel & Mess</option>
                                        <option value="ACADEMIC_ISSUES">Academic</option>
                                        <option value="FACILITY_MAINTENANCE">Maintenance</option>
                                        <option value="ADMINISTRATIVE_DELAY">Admin Delay</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Rendering the Tickets */}
                        <div>
                            <div className="grid grid-cols-1 gap-4">
                                {filteredTickets.length === 0 ? (
                                    <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500">
                                        No grievances found. You are all caught up!
                                    </div>
                                ) : (
                                    filteredTickets.map((ticket, index) => (
                                        <div key={ticket.ticketId || index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                                                        #{ticket.ticketId || 'NEW'}
                                                    </span>
                                                    <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
                                                        {ticket.category || 'Uncategorized'}
                                                    </span>
                                                </div>

                                                {/* Fallback to 'Untitled Issue' if the backend drops the title */}
                                                <h3 className="font-bold text-slate-800 text-lg">{ticket.title || 'Untitled Issue'}</h3>

                                                {/* Using ticket.content as the backend uses it for the description */}
                                                <p className="text-sm text-slate-600 mt-2 line-clamp-2">{ticket.content}</p>

                                                <p className="text-xs text-slate-400 mt-3">
                                                    Submitted on {ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Just now'}
                                                </p>

                                                {/* Display Admin Remark only if it exists and isn't weird JSON */}
                                                {ticket.adminRemark && !ticket.adminRemark.startsWith('{') && (<p className="text-sm text-indigo-600 font-medium mt-3 bg-indigo-50 p-2 rounded-lg inline-block">
                                                    Admin Reply: {ticket.adminRemark}
                                                </p>
                                                )}
                                            </div>

                                            <div className={`px-4 py-2 rounded-xl font-bold text-sm text-center min-w-[120px] border ${ticket.status === 'SOLVED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                                'bg-blue-50 text-blue-700 border-blue-200'
                                                }`}>
                                                {ticket.status || 'OPEN'}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>


        </div>


    )

}