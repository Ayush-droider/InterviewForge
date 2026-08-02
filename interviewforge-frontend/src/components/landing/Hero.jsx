import { Link } from "react-router-dom";
import {
    ArrowRight,
    PlayCircle,
    CheckCircle2,
    Sparkles,
} from "lucide-react";

import DashboardPreview from "./DashboardPreview";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-indigo-50">

            {/* Background Blur Effects */}

            <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />

            <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-20">

                {/* Badge */}

                <div className="flex justify-center">

                    <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-5 py-2 text-sm font-semibold text-indigo-700 shadow-sm">

                        <Sparkles size={16} />

                        AI Powered Interview Preparation Platform

                    </div>

                </div>

                {/* Heading */}

                <div className="mx-auto mt-8 max-w-5xl text-center">

                    <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl lg:text-7xl">

                        Land Your
                        <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                            {" "}Dream Job
                        </span>

                        <br />

                        with AI-Powered Mock Interviews

                    </h1>

                    <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-slate-600 md:text-xl">

                        Upload your resume, practice realistic mock interviews,
                        receive AI-powered feedback, improve your ATS score,
                        and confidently prepare for your next technical interview.

                    </p>

                </div>

                {/* CTA */}

                <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">

                    <Link
                        to="/login"
                        className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-300"
                    >
                        Start Free

                        <ArrowRight
                            size={20}
                            className="transition group-hover:translate-x-1"
                        />

                    </Link>

                    <button
                        className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-white px-8 py-4 text-lg font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-indigo-500 hover:bg-indigo-50"
                    >
                        <PlayCircle size={22} />

                        Watch Demo

                    </button>

                </div>

                {/* Highlights */}

                <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm font-medium text-slate-600">

                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="text-emerald-500" size={18} />
                        AI Resume Analysis
                    </div>

                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="text-emerald-500" size={18} />
                        Smart Mock Interviews
                    </div>

                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="text-emerald-500" size={18} />
                        ATS Optimization
                    </div>

                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="text-emerald-500" size={18} />
                        Personalized Feedback
                    </div>

                </div>

                {/* Dashboard Preview */}

                <DashboardPreview />

            </div>

        </section>
    );
}