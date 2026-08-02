import { useEffect, useState } from "react";
import {
    Bell,
    Moon,
    Search,
    UserCircle2,
    Sun,
} from "lucide-react";

export default function Navbar() {
    const [user, setUser] = useState({
        fullName: "User",
        role: "Candidate",
    });

    useEffect(() => {
        const fullName =
            localStorage.getItem("fullName") || "User";

        const role =
            localStorage.getItem("role") || "Candidate";

        setUser({
            fullName,
            role,
        });
    }, []);

    const hour = new Date().getHours();

    const greeting =
        hour < 12
            ? "Good Morning"
            : hour < 17
                ? "Good Afternoon"
                : "Good Evening";

    return (
        <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">

            {/* Left */}

            <div>

                <h1 className="text-3xl font-bold text-slate-900">
                    Dashboard
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    {greeting}, {user.fullName} 👋
                </p>

            </div>

            {/* Right */}

            <div className="flex items-center gap-4">

                {/* Search */}

                <div className="relative hidden lg:block">

                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="w-72 rounded-xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 transition focus:border-indigo-600 focus:bg-white focus:outline-none"
                    />

                </div>

                {/* Notifications */}

                <button className="relative rounded-xl border border-slate-200 p-3 transition hover:bg-slate-100">

                    <Bell size={20} />

                    <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>

                </button>

                {/* Theme */}

                <button className="rounded-xl border border-slate-200 p-3 transition hover:bg-slate-100">

                    <Moon size={20} />

                </button>

                {/* User */}

                <button className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2 transition hover:bg-slate-50">

                    <UserCircle2
                        size={38}
                        className="text-indigo-600"
                    />

                    <div className="hidden text-left md:block">

                        <h3 className="font-semibold text-slate-800">
                            {user.fullName}
                        </h3>

                        <p className="text-sm text-slate-500">
                            {user.role}
                        </p>

                    </div>

                </button>

            </div>

        </header>
    );
}