import { Link } from "react-router-dom";
import {
    BrainCircuit,
    Globe,
    Mail,
    ArrowUp,
} from "lucide-react";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className="border-t border-slate-200 bg-white">

            <div className="mx-auto max-w-7xl px-6 py-20">

                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}

                    <div>

                        <div className="flex items-center gap-3">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white">

                                <BrainCircuit size={24} />

                            </div>

                            <div>

                                <h2 className="text-xl font-bold">
                                    InterviewForge
                                </h2>

                                <p className="text-sm text-slate-500">
                                    AI Interview Platform
                                </p>

                            </div>

                        </div>

                        <p className="mt-6 leading-7 text-slate-600">
                            Prepare smarter with AI-powered resume analysis,
                            mock interviews, personalized feedback, and
                            performance analytics.
                        </p>

                    </div>

                    {/* Product */}

                    <div>

                        <h3 className="mb-5 font-semibold">
                            Product
                        </h3>

                        <ul className="space-y-3 text-slate-600">

                            <li>
                                <a href="#features" className="hover:text-indigo-600">
                                    Features
                                </a>
                            </li>

                            <li>
                                <a href="#how-it-works" className="hover:text-indigo-600">
                                    How It Works
                                </a>
                            </li>

                            <li>
                                <Link to="/login" className="hover:text-indigo-600">
                                    Dashboard
                                </Link>
                            </li>

                            <li>
                                <Link to="/login" className="hover:text-indigo-600">
                                    Mock Interview
                                </Link>
                            </li>

                        </ul>

                    </div>

                    {/* Resources */}

                    <div>

                        <h3 className="mb-5 font-semibold">
                            Resources
                        </h3>

                        <ul className="space-y-3 text-slate-600">

                            <li>
                                <a href="#" className="hover:text-indigo-600">
                                    Documentation
                                </a>
                            </li>

                            <li>
                                <a href="#" className="hover:text-indigo-600">
                                    Help Center
                                </a>
                            </li>

                            <li>
                                <a href="#" className="hover:text-indigo-600">
                                    Privacy Policy
                                </a>
                            </li>

                            <li>
                                <a href="#" className="hover:text-indigo-600">
                                    Terms of Service
                                </a>
                            </li>

                        </ul>

                    </div>

                    {/* Contact */}

                    <div>

                        <h3 className="mb-5 font-semibold">
                            Connect
                        </h3>

                        <div className="space-y-4">

                            <a
                                href="mailto:your@email.com"
                                className="flex items-center gap-3 text-slate-600 hover:text-indigo-600"
                            >
                                <Mail size={18} />
                                Email
                            </a>

                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-3 text-slate-600 hover:text-indigo-600"
                            >
                                <Globe size={18} />
                                GitHub
                            </a>

                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-3 text-slate-600 hover:text-indigo-600"
                            >
                                <Globe size={18} />
                                LinkedIn
                            </a>

                        </div>

                    </div>

                </div>

                <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-slate-200 pt-8 md:flex-row">

                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} InterviewForge.
                        All rights reserved.
                    </p>

                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-2 transition hover:bg-slate-100"
                    >
                        <ArrowUp size={18} />
                        Back to Top
                    </button>

                </div>

            </div>

        </footer>
    );
}