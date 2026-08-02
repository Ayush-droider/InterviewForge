import {
    Upload,
    ScanSearch,
    Mic,
    Trophy,
    ArrowDown,
} from "lucide-react";

const steps = [
    {
        icon: Upload,
        title: "Upload Resume",
        description:
            "Upload your latest resume in PDF format. Our platform securely stores and prepares it for AI analysis.",
        color: "from-indigo-500 to-violet-500",
    },
    {
        icon: ScanSearch,
        title: "AI Resume Analysis",
        description:
            "Receive ATS insights, identify missing keywords, and improve your resume using intelligent recommendations.",
        color: "from-cyan-500 to-sky-500",
    },
    {
        icon: Mic,
        title: "Mock Interview",
        description:
            "Practice realistic AI-generated interview questions tailored to your target role and resume.",
        color: "from-emerald-500 to-green-500",
    },
    {
        icon: Trophy,
        title: "Performance Report",
        description:
            "Get detailed feedback, topic-wise scores, strengths, and improvement suggestions after every interview.",
        color: "from-orange-500 to-red-500",
    },
];

export default function HowItWorks() {
    return (
        <section
            id="how-it-works"
            className="bg-slate-50 py-28"
        >
            <div className="mx-auto max-w-7xl px-6">

                {/* Heading */}

                <div className="text-center">

                    <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
                        How It Works
                    </span>

                    <h2 className="mt-6 text-5xl font-bold text-slate-900">
                        Four Simple Steps to
                        <span className="text-indigo-600">
                            {" "}Interview Success
                        </span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                        InterviewForge guides you through every stage of interview preparation,
                        from resume optimization to AI-powered interview evaluation.
                    </p>

                </div>

                {/* Timeline */}

                <div className="mx-auto mt-20 max-w-4xl">

                    {steps.map((step, index) => {

                        const Icon = step.icon;

                        return (

                            <div
                                key={step.title}
                                className="flex flex-col items-center"
                            >

                                <div className="flex w-full flex-col items-center rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl md:flex-row">

                                    <div
                                        className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r ${step.color} text-white shadow-lg`}
                                    >

                                        <Icon size={34} />

                                    </div>

                                    <div className="mt-6 text-center md:ml-8 md:mt-0 md:text-left">

                                        <div className="mb-3 inline-flex rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
                                            Step {index + 1}
                                        </div>

                                        <h3 className="text-2xl font-bold text-slate-900">
                                            {step.title}
                                        </h3>

                                        <p className="mt-4 max-w-2xl leading-8 text-slate-600">
                                            {step.description}
                                        </p>

                                    </div>

                                </div>

                                {index !== steps.length - 1 && (
                                    <div className="my-6 flex justify-center">
                                        <ArrowDown
                                            size={32}
                                            className="text-indigo-400"
                                        />
                                    </div>
                                )}

                            </div>

                        );

                    })}

                </div>

            </div>
        </section>
    );
}