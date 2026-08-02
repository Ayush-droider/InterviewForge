import {
    FileText,
    Mic,
    TrendingUp,
    Brain,
    CheckCircle2,
} from "lucide-react";

export default function DashboardPreview() {
    return (
        <div className="mx-auto mt-16 max-w-6xl">

            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-2xl">

                {/* Top Stats */}

                <div className="grid gap-6 md:grid-cols-4">

                    <div className="rounded-2xl bg-indigo-50 p-6">
                        <FileText className="text-indigo-600" size={30} />

                        <h3 className="mt-5 text-4xl font-bold">
                            91%
                        </h3>

                        <p className="mt-2 text-slate-500">
                            Resume Score
                        </p>
                    </div>

                    <div className="rounded-2xl bg-cyan-50 p-6">
                        <Mic className="text-cyan-600" size={30} />

                        <h3 className="mt-5 text-4xl font-bold">
                            18
                        </h3>

                        <p className="mt-2 text-slate-500">
                            Interviews
                        </p>
                    </div>

                    <div className="rounded-2xl bg-violet-50 p-6">
                        <TrendingUp
                            className="text-violet-600"
                            size={30}
                        />

                        <h3 className="mt-5 text-4xl font-bold">
                            87%
                        </h3>

                        <p className="mt-2 text-slate-500">
                            Success Rate
                        </p>
                    </div>

                    <div className="rounded-2xl bg-emerald-50 p-6">
                        <Brain
                            className="text-emerald-600"
                            size={30}
                        />

                        <h3 className="mt-5 text-4xl font-bold">
                            AI
                        </h3>

                        <p className="mt-2 text-slate-500">
                            Feedback Ready
                        </p>
                    </div>

                </div>

                {/* Bottom Grid */}

                <div className="mt-8 grid gap-8 lg:grid-cols-3">

                    {/* Recent Interviews */}

                    <div className="rounded-2xl border border-slate-200 p-6 lg:col-span-2">

                        <h2 className="text-xl font-bold">
                            Recent Interviews
                        </h2>

                        <div className="mt-6 space-y-4">

                            {[
                                ["Java Backend", "92%"],
                                ["Spring Boot", "89%"],
                                ["React Developer", "94%"],
                            ].map(([role, score]) => (

                                <div
                                    key={role}
                                    className="flex items-center justify-between rounded-xl bg-slate-50 p-4"
                                >

                                    <span className="font-medium">
                                        {role}
                                    </span>

                                    <span className="font-bold text-indigo-600">
                                        {score}
                                    </span>

                                </div>

                            ))}

                        </div>

                    </div>

                    {/* AI Suggestions */}

                    <div className="rounded-2xl border border-slate-200 p-6">

                        <h2 className="text-xl font-bold">
                            AI Suggestions
                        </h2>

                        <div className="mt-6 space-y-5">

                            {[
                                "Improve Spring Security",
                                "Practice DBMS",
                                "Revise Java Collections",
                                "Optimize Resume Keywords",
                            ].map((item) => (

                                <div
                                    key={item}
                                    className="flex gap-3"
                                >

                                    <CheckCircle2
                                        className="mt-1 text-emerald-600"
                                        size={18}
                                    />

                                    <span className="text-slate-600">
                                        {item}
                                    </span>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}