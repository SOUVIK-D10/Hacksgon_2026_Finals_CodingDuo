import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    // This runs when login is clicked
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const API_URL = import.meta.env.VITE_API_BASE_URL;

            const response = await fetch(`${API_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true' // To bypass the ngrok HTML warning page
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });

            if (response.ok) {
                const data = await response.json();

                console.log("My Backend Data:", data);
                // Save the keys exactly as his backend sends them
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('role', data.role);

                // Go to the dashboard
                navigate('/dashboard');
            }
            else {
                // Backend rejected the login (e.g., wrong password)
                setError(data.message || 'Invalid registration number or password.');
            }


        } catch (err) {
            console.error("Connection error:", err);
            // This happens if the backend is off or the Wi-Fi drops
            setError('Could not connect to the server. Is the backend running?');
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 font-sans">
            <div className="w-full bg-white max-w-6xl rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">


                {/* Left Login Panel */}
                <div className="bg-white p-10 md:p-16 w-full md:w-1/2 flex flex-col justify-center">

                    <h2 className="text-4xl font-extrabold text-slate-800 mb-2">Student Login</h2>
                    <p className="text-slate-500 mb-8 text-lg">Access your academic and support services</p>

                    {/* Dynamics error box */}
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>

                        {/* Email Address */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                College Email
                            </label>

                            <input type="email"
                                placeholder="student@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow" />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Password
                            </label>

                            <input type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                            />
                        </div>
                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Connecting...' : 'Login'}
                        </button>

                    </form>

                    {/* Admin Link */}
                    <p>Are you an admin? <a href="#" className="text-indigo-600 font-semibold hover:text-indigo-800 hover:underline transition-colors">
                        Click here
                    </a></p>
                </div>

                {/* Right welcome panel */}
                <div className="w-full md:w-1/2 p-10 md:p-16 bg-slate-900 flex flex-col justify-center relative overflow-hidden">
                    {/* Decorative background element */}
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-emerald-500 rounded-full opacity-20 blur-3xl"></div>

                    <div className="relative z-10">
                        <h2 className="text-5xl md:text-6xl text-white font-bold mb-6 tracking-tight">Welcome Back</h2>
                        <p className="text-slate-300 text-xl leading-relaxed">
                            Sign in to manage academics, grievances, and access mental health support — all in one unified platform.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}