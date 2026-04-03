import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ title = "SupportHub", themeColor = "indigo" }) => {
    return (
        <nav className="flex justify-between p-4 bg-white border-b shadow-sm">
            <h1 className="font-bold text-xl">{title}</h1>
            <Link to="/" className="text-indigo-600 hover:underline">Home</Link>
        </nav>
    );
};

export default Navbar; // Keep the default export at the bottom