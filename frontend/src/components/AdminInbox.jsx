import React, { useState, useEffect } from 'react';

export default function AdminInbox() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter State
    const [filterCategory, setFilterCategory] = useState('ALL');

    // Modal State
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [adminRemark, setAdminRemark] = useState('');
    const [isResolving, setIsResolving] = useState(false);
    const [isReviewing, setIsReviewing] = useState(false);

    // Fetch all tickets for the Admin
    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        setLoading(true);
        try {
            const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
            const token = localStorage.getItem('accessToken');

            const response = await fetch(`${API_URL}/api/ticket/all`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': 'true'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setTickets(data.content || data || []);
            } else {
                console.error("Failed to fetch tickets");
            }
        } catch (error) {
            console.error("Network error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleTicketAction = async (e, targetStatus) => {
        e.preventDefault();

        const isSolving = targetStatus === 'SOLVED';

        if (isSolving) setIsResolving(true);
        else setIsReviewing(true);

        try {
            const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
            const token = localStorage.getItem('accessToken');

            const endpoint = isSolving
                ? `${API_URL}/api/ticket/solved/${selectedTicket.ticketId}`
                : `${API_URL}/api/ticket/seen/${selectedTicket.ticketId}`;

            const requestOptions = {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': 'true'
                }
            };

            if (isSolving) {
                requestOptions.headers['Content-Type'] = 'text/plain';
                requestOptions.body = adminRemark || "Resolved by Admin";
            }

            const response = await fetch(endpoint, requestOptions);

            if (response.ok) {
                setTickets(prev => prev.map(t =>
                    t.ticketId === selectedTicket.ticketId
                        ? { ...t, status: targetStatus, adminRemark: isSolving ? adminRemark : t.adminRemark }
                        : t
                ));
                setSelectedTicket(null);
                setAdminRemark('');
            } else {
                alert(`Failed to update ticket. Backend returned ${response.status}`);
            }
        } catch (error) {
            console.error("Action error:", error);
        } finally {
            setIsResolving(false);
            setIsReviewing(false);
        }
    };

    const getCategoryBadge = (category) => {
        const safeCategory = (category || 'OTHER').toUpperCase();
        switch (safeCategory) {
            case 'TECHNICAL_SUPPORT': return 'bg-blue-100 text-blue-700';
            case 'FACILITY_MAINTENANCE': return 'bg-amber-100 text-amber-700';
            case 'ACADEMIC_ISSUES': return 'bg-indigo-100 text-indigo-700';
            case 'HOSTEL_MANAGEMENT': return 'bg-rose-100 text-rose-700';
            case 'ADMINISTRATIVE_DELAY': return 'bg-purple-100 text-purple-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    // Calculate Stats (Based on ALL tickets, not filtered)
    const pendingCount = tickets.filter(t => t.status === 'SUBMITTED').length;
    const resolvedCount = tickets.filter(t => t.status === 'SOLVED').length;

    // Apply Filter Logic
    const filteredTickets = tickets.filter(ticket => {
        if (filterCategory === 'ALL') return true;
        // Check if the ticket's category matches the selected filter
        return ticket.category === filterCategory;
    });

    return (
        <div className="h-full flex flex-col relative">

            {/* Stats Header */}
            <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-xl font-bold">📥</div>
                    <div>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Total Tickets</p>
                        <p className="text-2xl font-extrabold text-slate-800">{tickets.length}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center text-xl font-bold">⚠️</div>
                    <div>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Pending Action</p>
                        <p className="text-2xl font-extrabold text-rose-600">{pendingCount}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-xl font-bold">✅</div>
                    <div>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Resolved</p>
                        <p className="text-2xl font-extrabold text-emerald-600">{resolvedCount}</p>
                    </div>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="flex justify-between items-center mb-4 px-1">
                <h3 className="text-lg font-bold text-slate-800">Grievance Database</h3>
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="bg-white border-2 border-slate-200 text-sm rounded-xl px-4 py-2.5 font-bold text-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm cursor-pointer transition-all"
                >
                    <option value="ALL">All Categories</option>
                    <option value="TECHNICAL_SUPPORT">Technical Support</option>
                    <option value="FACILITY_MAINTENANCE">Facility Maintenance</option>
                    <option value="ACADEMIC_ISSUES">Academic Issues</option>
                    <option value="HOSTEL_MANAGEMENT">Hostel Management</option>
                    <option value="ADMINISTRATIVE_DELAY">Administrative Delay</option>
                </select>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex-1 overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                <th className="p-4 pl-6">ID</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">AI Category Tag</th>
                                <th className="p-4">Title</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 pr-6 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr><td colSpan="6" className="p-8 text-center text-slate-400 animate-pulse font-medium">Loading inbox...</td></tr>
                            ) : filteredTickets.length === 0 ? (
                                <tr><td colSpan="6" className="p-8 text-center text-slate-400 font-medium">No tickets found for this category.</td></tr>
                            ) : (
                                filteredTickets.map(ticket => (
                                    <tr key={ticket.ticketId} className="hover:bg-slate-50 transition-colors group cursor-pointer" onClick={() => setSelectedTicket(ticket)}>
                                        <td className="p-4 pl-6 text-sm font-bold text-slate-400">#{ticket.ticketId}</td>
                                        <td className="p-4 text-sm font-medium text-slate-600">
                                            {new Date(ticket.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </td>
                                        <td className="p-4">
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${getCategoryBadge(ticket.category)}`}>
                                                {ticket.category ? ticket.category.replace('_', ' ') : 'UNSORTED'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm font-bold text-slate-800 truncate max-w-xs">{ticket.title}</td>
                                        <td className="p-4">
                                            <span className={`text-xs font-bold px-2 py-1 rounded-md 
                                                ${ticket.status === 'SOLVED' ? 'bg-emerald-100 text-emerald-700' :
                                                    ticket.status === 'UNDER_REVIEW' || ticket.status === 'SEEN' ? 'bg-amber-100 text-amber-700' :
                                                        'bg-rose-100 text-rose-700'}`}
                                            >
                                                {ticket.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="p-4 pr-6 text-right">
                                            <button
                                                className="text-indigo-600 font-bold text-sm hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={(e) => { e.stopPropagation(); setSelectedTicket(ticket); }}
                                            >
                                                Review →
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* RESOLUTION MODAL OVERLAY */}
            {selectedTicket && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex justify-end">
                    <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-fade-in-left">

                        {/* Modal Header */}
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <div>
                                <h3 className="text-xl font-extrabold text-slate-800">Review Ticket #{selectedTicket.ticketId}</h3>
                                <p className="text-sm text-slate-500 font-medium mt-1">Submitted on {new Date(selectedTicket.createdAt).toLocaleString()}</p>
                            </div>
                            <button onClick={() => setSelectedTicket(null)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 font-bold">✕</button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 flex-1 overflow-y-auto">
                            <div className="mb-6">
                                <span className={`text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block ${getCategoryBadge(selectedTicket.category)}`}>
                                    {selectedTicket.category.replace('_', ' ')}
                                </span>
                                <h4 className="text-lg font-bold text-slate-800 mb-2">{selectedTicket.title}</h4>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                                    {selectedTicket.content}
                                </div>
                            </div>

                            {selectedTicket.status === 'SOLVED' ? (
                                <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl">
                                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">Resolution Remark</p>
                                    <p className="text-sm text-emerald-900 font-medium">{selectedTicket.adminRemark || "Resolved without remark."}</p>
                                </div>
                            ) : (
                                <form className="mt-8 border-t border-slate-100 pt-6">
                                    <h4 className="text-sm font-bold text-slate-800 mb-3">Admin Action</h4>
                                    <textarea
                                        required={selectedTicket.status === 'SUBMITTED'} // Only required if solving
                                        rows="4"
                                        placeholder="Add resolution details for the student..."
                                        className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm mb-4 resize-none"
                                        value={adminRemark}
                                        onChange={(e) => setAdminRemark(e.target.value)}
                                    ></textarea>

                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedTicket(null)}
                                            className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition"
                                        >
                                            Cancel
                                        </button>

                                        {selectedTicket.status === 'SUBMITTED' && (
                                            <button
                                                type="button"
                                                disabled={isReviewing || isResolving}
                                                onClick={(e) => handleTicketAction(e, 'UNDER_REVIEW')}
                                                className={`flex-1 py-3 font-bold rounded-xl transition text-amber-900 border border-amber-200 ${isReviewing ? 'bg-amber-200 cursor-wait' : 'bg-amber-100 hover:bg-amber-200 shadow-sm'}`}
                                            >
                                                {isReviewing ? 'Updating...' : '👀 Mark Under Review'}
                                            </button>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isResolving || isReviewing}
                                            onClick={(e) => handleTicketAction(e, 'SOLVED')}
                                            className={`flex-1 py-3 font-bold rounded-xl transition text-white ${isResolving ? 'bg-indigo-400 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-700 shadow-md'}`}
                                        >
                                            {isResolving ? 'Resolving...' : 'Mark as Solved ✅'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}