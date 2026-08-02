import {
    Star,
    Quote,
} from "lucide-react";

const testimonials = [
    {
        name: "Ayush Pandey",
        role: "Backend Developer",
        text: "InterviewForge helped me improve my resume score and prepare confidently for technical interviews. The AI feedback was detailed and practical.",
    },
    {
        name: "Priya Sharma",
        role: "Software Engineer",
        text: "The mock interviews felt realistic and highlighted the exact areas where I needed improvement.",
    },
    {
        name: "Rahul Verma",
        role: "Java Developer",
        text: "The scorecards and analytics helped me track my progress after every interview. It became my daily interview preparation tool.",
    },
];

export default function Testimonials() {
    return (
        <section className="bg-white py-28">

            <div className="mx-auto max-w-7xl px-6">

                <div className="text-center">

                    <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
                        Testimonials
                    </span>

                    <h2 className="mt-6 text-5xl font-bold text-slate-900">
                        Loved by Students &
                        <span className="text-indigo-600">
                            {" "}Job Seekers
                        </span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                        Hear what users have to say about their InterviewForge experience.
                    </p>

                </div>

                <div className="mt-20 grid gap-8 md:grid-cols-3">

                    {testimonials.map((item) => (

                        <div
                            key={item.name}
                            className="rounded-3xl border border-slate-200 bg-slate-50 p-8 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                        >

                            <Quote
                                className="text-indigo-600"
                                size={32}
                            />

                            <div className="mt-6 flex gap-1">

                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={18}
                                        className="fill-yellow-400 text-yellow-400"
                                    />
                                ))}

                            </div>

                            <p className="mt-6 leading-8 text-slate-600">
                                "{item.text}"
                            </p>

                            <div className="mt-8">

                                <h3 className="font-bold">
                                    {item.name}
                                </h3>

                                <p className="text-slate-500">
                                    {item.role}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}