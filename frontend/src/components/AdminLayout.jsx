import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function AdminLayout({ children }) {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    const navItems = [
        { name: 'Grievance Inbox', path: '/admin/inbox', icon: '📥' },
        { name: 'AI Notice Co-Pilot', path: '/admin/notices', icon: '✨' },
        { name: 'Student Directory', path: '#', icon: '👥' } // Placeholder for looks
    ];

    return (
        <div className="flex h-screen bg-slate-100 font-sans overflow-hidden">
            
            {/* LEFT SIDEBAR (Dark Theme) */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl z-20">
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-xl font-extrabold flex items-center gap-2">
                        <span className="text-indigo-400">⚡</span> Admin Portal
                    </h1>
                    <p className="text-xs text-slate-400 mt-1 font-medium tracking-wide uppercase">Unified Support System</p>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                                    isActive 
                                    ? 'bg-indigo-600 text-white shadow-md' 
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                                }`}
                            >
                                <span className="text-lg">{item.icon}</span>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-medium text-slate-400 hover:bg-rose-500 hover:text-white transition-colors"
                    >
                        <span>🚪</span> Sign Out
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT WORKSPACE */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                {/* Top Header Bar */}
                <header className="bg-white h-16 border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-10 shrink-0">
                    <h2 className="text-lg font-bold text-slate-800">
                        {navItems.find(item => item.path === location.pathname)?.name || 'Dashboard'}
                    </h2>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm">
                            AD
                        </div>
                        <span className="text-sm font-bold text-slate-600">Admin User</span>
                    </div>
                </header>

                {/* The Actual Page Content injects here */}
                <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
                    {children}
                </div>
            </main>

        </div>
    );
}