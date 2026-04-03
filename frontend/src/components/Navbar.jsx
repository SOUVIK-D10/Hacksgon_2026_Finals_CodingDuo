import React from "react";
import { Link } from "react-router-dom";

export function Navbar({
    title = "Unified Student Support Platform",
    icon = null,
    backLink = "/dashboard",
    backText = "Back To Dashboard",
    themeColor = "slate",
    rightElement = null
}) {

    const colorClasses = {
        slate: "text-slate-600 hover:text-slate-800 border-slate-100",
        indigo: "text-indigo-600 hover:text-indigo-800 border-indigo-100",
        teal: "text-teal-600 hover:text-teal-800 border-teal-100",
        amber: "text-amber-600 hover:text-amber-800 border-amber-100",
    };

    const currentTheme = colorClasses[themeColor] || colorClasses.slate;


    return (
        <nav className="">

            {/* For Title */}
            <div className="">
                {icon && <span>{icon}</span>}
                {title}
            </div>

            {/* The dynamic right side */}
            <div>
                {rightElement ? (rightElement) : (<Link to={backLink}
                    className={`transition whitespace-nowrap text-right ${currentTheme.split(' ').slice(0, 2).join(' ')}`}>

                    <span className="inline sm:hidden">&larr; Back</span>
                    <span className="hidden sm:inline">&larr; {backText}</span>

                </Link>
                )}
            </div>
        </nav>
    );
}