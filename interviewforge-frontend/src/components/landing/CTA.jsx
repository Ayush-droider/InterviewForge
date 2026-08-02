import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
    return (
        <section className="py-28 bg-slate-50">

            <div className="mx-auto max-w-7xl px-6">

                <div className="overflow-hidden rounded-[36px] bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-10 py-20 text-center text-white shadow-2xl">

                    <div className="mx-auto max-w-4xl">

                        <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2 text-sm font-semibold backdrop-blur">

                            <Sparkles size={16} />

                            Start Your Interview Journey Today

                        </div>

                        <h2 className="mt-8 text-4xl font-extrabold leading-tight md:text-6xl">

                            Ready to Land
                            <br />
                            Your Dream Job?

                        </h2>

                        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-indigo-100">

                            Upload your resume, practice AI-powered mock interviews,
                            receive personalized feedback, and build confidence before
                            your next technical interview.

                        </p>

                        <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">

                            <Link
                                to="/login"
                                className="group flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-semibold text-indigo-700 shadow-lg transition-all duration-300 hover:scale-105"
                            >

                                Start Free

                                <ArrowRight
                                    size={20}
                                    className="transition group-hover:translate-x-1"
                                />

                            </Link>

                            <Link
                                to="/login"
                                className="rounded-2xl border border-white/30 px-8 py-4 text-lg font-semibold transition hover:bg-white/10"
                            >
                                Explore Platform
                            </Link>

                        </div>

                        <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-indigo-100">

                            <span>✓ No Credit Card Required</span>

                            <span>✓ AI-Powered Analysis</span>

                            <span>✓ Unlimited Practice</span>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}