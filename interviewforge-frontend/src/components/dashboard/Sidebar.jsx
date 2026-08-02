import {
    LayoutDashboard,
    FileText,
    BookOpen,
    Mic,
    History,
    User,
    Settings,
    LogOut,
    BrainCircuit,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

const menu = [
    {
        icon: LayoutDashboard,
        label: "Dashboard",
        path: "/dashboard",
    },
    {
        icon: FileText,
        label: "Resume",
        path: "/resume",
    },
    {
        icon: BookOpen,
        label: "Study Resources",
        path: "/resources",
    },
    {
        icon: Mic,
        label: "Mock Interview",
        path: "/interview",
    },
    {
        icon: History,
        label: "Interview History",
        path: "/history",
    },
    {
        icon: User,
        label: "Profile",
        path: "/profile",
    },
    {
        icon: Settings,
        label: "Settings",
        path: "/settings",
    },
];

export default function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-white">

            {/* Logo */}

            <div className="border-b border-slate-200 p-8">

                <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg">

                        <BrainCircuit size={24} />

                    </div>

                    <div>

                        <h1 className="text-xl font-bold text-slate-900">
                            InterviewForge
                        </h1>

                        <p className="text-sm text-slate-500">
                            AI Interview Platform
                        </p>

                    </div>

                </div>

            </div>

            {/* Navigation */}

            <nav className="flex-1 overflow-y-auto px-4 py-6">

                {menu.map(({ icon: Icon, label, path }) => (

                    <NavLink
                        key={label}
                        to={path}
                        className={({ isActive }) =>
                            `mb-2 flex items-center gap-4 rounded-xl px-4 py-3 font-medium transition-all duration-200 ${isActive
                                ? "bg-indigo-600 text-white shadow-lg"
                                : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                            }`
                        }
                    >

                        <Icon size={20} />

                        <span>{label}</span>

                    </NavLink>

                ))}

            </nav>

            {/* Logout */}

            <div className="border-t border-slate-200 p-4">

                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-4 rounded-xl px-4 py-3 font-medium text-red-500 transition hover:bg-red-50"
                >

                    <LogOut size={20} />

                    Logout

                </button>

            </div>

        </aside>
    );
}