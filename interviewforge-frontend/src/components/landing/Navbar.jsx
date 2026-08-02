import { Link } from "react-router-dom";
import { BrainCircuit, ArrowRight } from "lucide-react";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">

            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

                {/* Logo */}

                <Link
                    to="/"
                    className="group flex items-center gap-3"
                >

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg transition duration-300 group-hover:scale-110">

                        <BrainCircuit size={22} />

                    </div>

                    <div>

                        <h1 className="text-xl font-bold text-slate-900">
                            InterviewForge
                        </h1>

                        <p className="text-xs text-slate-500">
                            AI Powered Interview Platform
                        </p>

                    </div>

                </Link>

                {/* Navigation */}

                <nav className="hidden items-center gap-10 lg:flex">

                    <a
                        href="#features"
                        className="font-medium text-slate-600 transition hover:text-indigo-600"
                    >
                        Features
                    </a>

                    <a
                        href="#how-it-works"
                        className="font-medium text-slate-600 transition hover:text-indigo-600"
                    >
                        How It Works
                    </a>

                    <a
                        href="#pricing"
                        className="font-medium text-slate-600 transition hover:text-indigo-600"
                    >
                        Pricing
                    </a>

                    <a
                        href="#faq"
                        className="font-medium text-slate-600 transition hover:text-indigo-600"
                    >
                        FAQ
                    </a>

                </nav>

                {/* Right Side */}

                <div className="flex items-center gap-4">

                    <Link
                        to="/login"
                        className="rounded-xl px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                        Login
                    </Link>

                    <Link
                        to="/login"
                        className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-indigo-300"
                    >

                        Get Started

                        <ArrowRight
                            size={18}
                            className="transition group-hover:translate-x-1"
                        />

                    </Link>

                </div>

            </div>

        </header>
    );
}