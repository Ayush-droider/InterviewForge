import {
    FileText,
    Mic,
    BarChart3,
    BookOpen,
    ArrowRight,
} from "lucide-react";

const features = [
    {
        title: "AI Resume Analysis",
        description:
            "Upload your resume and receive instant AI-powered analysis, ATS optimization tips, and personalized improvement suggestions.",
        icon: FileText,
        color: "from-indigo-500 to-violet-500",
    },
    {
        title: "Smart Mock Interviews",
        description:
            "Practice role-specific interview questions generated dynamically based on your resume and target role.",
        icon: Mic,
        color: "from-cyan-500 to-sky-500",
    },
    {
        title: "Performance Analytics",
        description:
            "Track your interview scores, strengths, weaknesses, and progress with detailed analytics dashboards.",
        icon: BarChart3,
        color: "from-emerald-500 to-green-500",
    },
    {
        title: "Study Resources",
        description:
            "Upload study materials and organize everything in one place for efficient interview preparation.",
        icon: BookOpen,
        color: "from-orange-500 to-red-500",
    },
];

export default function Features() {
    return (
        <section
            id="features"
            className="bg-white py-28"
        >
            <div className="mx-auto max-w-7xl px-6">

                <div className="text-center">

                    <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
                        Features
                    </span>

                    <h2 className="mt-6 text-5xl font-bold text-slate-900">
                        Everything You Need to
                        <span className="text-indigo-600">
                            {" "}Crack Interviews
                        </span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                        InterviewForge combines AI, resume analysis,
                        mock interviews, analytics and learning tools
                        into one seamless platform.
                    </p>

                </div>

                <div className="mt-20 grid gap-8 md:grid-cols-2">

                    {features.map((feature) => {

                        const Icon = feature.icon;

                        return (

                            <div
                                key={feature.title}
                                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                            >

                                <div
                                    className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${feature.color} text-white`}
                                >

                                    <Icon size={30} />

                                </div>

                                <h3 className="mt-8 text-2xl font-bold">
                                    {feature.title}
                                </h3>

                                <p className="mt-4 leading-8 text-slate-600">
                                    {feature.description}
                                </p>

                                <button className="mt-8 flex items-center gap-2 font-semibold text-indigo-600 transition group-hover:gap-4">

                                    Learn More

                                    <ArrowRight size={18} />

                                </button>

                            </div>

                        );

                    })}

                </div>

            </div>
        </section>
    );
}