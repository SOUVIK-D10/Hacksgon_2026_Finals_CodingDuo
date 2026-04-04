import React, { useState } from 'react';

export default function AdminBroadcast() {
    // --- UI STATE ---
    // 'notice' or 'resource'
    const [activeTab, setActiveTab] = useState('notice');

    // --- SHARED STATE ---
    const [title, setTitle] = useState('');
    const [isPublishing, setIsPublishing] = useState(false);

    // --- NOTICE STATE ---
    const [rawText, setRawText] = useState('');
    const [generatedNotice, setGeneratedNotice] = useState('');
    const [noticeCategory, setNoticeCategory] = useState('GENERAL');
    const [isUrgent, setIsUrgent] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    // --- RESOURCE STATE ---
    const [resourceUrl, setResourceUrl] = useState('');
    const [resourceCategory, setResourceCategory] = useState('ACADEMIC');

    // --- AI GENERATION (For Notices Only) ---
    const handleGenerateAI = async () => {
        if (!rawText.trim()) return;
        setIsGenerating(true);

        try {
            const API_URL = import.meta.env.VITE_API_BASE_URL;
            const token = localStorage.getItem('accessToken');

            const response = await fetch(`${API_URL}/api/notice/enhance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify({ text: rawText })
            });

            if (response.ok) {
                const data = await response.text();
                setGeneratedNotice(data);
            } else {
                alert(`AI Generation failed. Status: ${response.status}`);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    // --- STRICT PUBLISHING ROUTER ---
    const handlePublish = async () => {
        setIsPublishing(true);
        try {
            const API_URL = import.meta.env.VITE_API_BASE_URL;
            const token = localStorage.getItem('accessToken');
            const javaFriendlyDate = new Date().toISOString().split('.')[0]; 

            let endpoint = '';
            let payload = {};

            // 1. NOTICE PUBLISHING LOGIC
            if (activeTab === 'notice') {
                if (!title.trim() || !generatedNotice.trim()) {
                    alert("Title and final Notice Content are required!");
                    setIsPublishing(false);
                    return;
                }
                endpoint = '/api/notice/new';
                payload = { 
                    title: title,
                    content: generatedNotice,
                    category: noticeCategory,
                    urgent: isUrgent,
                    createdAt: javaFriendlyDate 
                };
            } 
            // 2. RESOURCE PUBLISHING LOGIC
            else {
                if (!title.trim() || !resourceUrl.trim()) {
                    alert("Title and Document URL are required for resources!");
                    setIsPublishing(false);
                    return;
                }
                endpoint = '/api/resource/new';
                payload = {
                    title: title,
                    url: resourceUrl,
                    category: resourceCategory,
                    format: "LINK", // Hardcoded generic format
                    fileSize: 34, // Hardcoded generic size
                    createdAt: javaFriendlyDate
                };
            }

            // 3. SEND TO THE CORRECT BACKEND TABLE
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert(`✅ ${activeTab === 'notice' ? 'Notice' : 'Resource'} Published Successfully!`);
                // Clear the form
                setTitle('');
                if (activeTab === 'notice') {
                    setRawText('');
                    setGeneratedNotice('');
                    setIsUrgent(false);
                } else {
                    setResourceUrl('');
                }
            } else {
                const errorData = await response.text();
                console.error("Backend Error Response:", errorData);
                alert(`Failed to publish. Server returned ${response.status}.`);
            }
        } catch (error) {
            console.error(error);
            alert("Network error.");
        } finally {
            setIsPublishing(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto flex flex-col h-full animate-fade-in pb-10">
            
            {/* Header & Toggle Switch */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-800">Broadcast Center</h2>
                    <p className="text-slate-500 font-medium mt-1">Select the type of content you want to distribute to the campus.</p>
                </div>
                
                {/* The Toggle Form Switch */}
                <div className="flex bg-slate-200 p-1 rounded-xl shadow-inner border border-slate-300 w-fit">
                    <button 
                        onClick={() => setActiveTab('notice')}
                        className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${activeTab === 'notice' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        📢 Publish Notice
                    </button>
                    <button 
                        onClick={() => setActiveTab('resource')}
                        className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${activeTab === 'resource' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        📎 Link Resource
                    </button>
                </div>
            </div>

            {/* ========================================= */}
            {/* TAB 1: NOTICES (Two Columns with AI)       */}
            {/* ========================================= */}
            {activeTab === 'notice' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left: AI Draft */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
                        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
                            Draft Content
                        </h3>
                        <textarea
                            value={rawText}
                            onChange={(e) => setRawText(e.target.value)}
                            placeholder="Type your messy notes here... AI will fix the formatting."
                            className="flex-1 w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none min-h-[300px]"
                        ></textarea>
                        <button 
                            onClick={handleGenerateAI}
                            disabled={isGenerating || !rawText.trim()}
                            className={`mt-6 py-4 rounded-2xl font-bold transition w-full text-white text-lg ${isGenerating || !rawText.trim() ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg'}`}
                        >
                            {isGenerating ? 'AI is formatting...' : '✨ Enhance with AI'}
                        </button>
                    </div>

                    {/* Right: Final Notice Data */}
                    <div className="bg-slate-900 p-8 rounded-3xl shadow-xl flex flex-col text-white border border-slate-800">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                            <span className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm">2</span>
                            Final Review & Metadata
                        </h3>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Notice Title</label>
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Mid-Term Schedule Update" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Notice Category</label>
                                    <select value={noticeCategory} onChange={(e) => setNoticeCategory(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                                        <option value="GENERAL">General</option>
                                        <option value="ACADEMIC">Academic</option>
                                        <option value="HOSTEL">Hostel</option>
                                    </select>
                                </div>
                                <div className="flex flex-col justify-center pt-6">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input type="checkbox" checked={isUrgent} onChange={(e) => setIsUrgent(e.target.checked)} className="w-5 h-5 rounded border-slate-700 bg-slate-800 text-rose-500 focus:ring-rose-500" />
                                        <span className="text-sm font-bold group-hover:text-rose-400 transition-colors">Urgent?</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Final Notice Text</label>
                                <textarea value={generatedNotice} onChange={(e) => setGeneratedNotice(e.target.value)} placeholder="AI output will appear here..." className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none min-h-[180px] resize-none"></textarea>
                            </div>

                            <button onClick={handlePublish} disabled={isPublishing || !generatedNotice.trim() || !title.trim()} className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${isPublishing || !generatedNotice.trim() || !title.trim() ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 text-white'}`}>
                                {isPublishing ? 'Broadcasting...' : '📢 Publish Notice'}
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* ========================================= */}
            {/* TAB 2: RESOURCES (Single Clean Column)    */}
            {/* ========================================= */}
            {activeTab === 'resource' && (
                <div className="max-w-2xl mx-auto w-full">
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Upload Academic Resource</h3>
                        <p className="text-slate-500 text-sm mb-6">Link Google Drive, Dropbox, or external URLs for students to download.</p>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Resource Title</label>
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., CS-201 Data Structures Syllabus" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Resource Category</label>
                                <select value={resourceCategory} onChange={(e) => setResourceCategory(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer">
                                    {/* EXACT MATCH FOR SRIJAN'S SET */}
                                    <option value="SYLLABUS">Syllabus</option>
                                    <option value="NOTES">Notes</option>
                                    <option value="PREVIOUS_PAPERS">Previous Papers</option>
                                    <option value="LAB">Lab Manual</option>
                                    <option value="ACADEMIC">Academic</option>
                                    <option value="BOOKS">Books</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Document URL</label>
                                <input type="url" value={resourceUrl} onChange={(e) => setResourceUrl(e.target.value)} placeholder="https://drive.google.com/..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                            </div>

                            <button onClick={handlePublish} disabled={isPublishing || !title.trim() || !resourceUrl.trim()} className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${isPublishing || !title.trim() || !resourceUrl.trim() ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 text-white'}`}>
                                {isPublishing ? 'Linking...' : '📎 Publish Resource'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}