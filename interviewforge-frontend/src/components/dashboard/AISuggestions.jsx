import { Sparkles } from "lucide-react";

const suggestions = [
    "Practice Java Collections interview questions.",
    "Improve Spring Security concepts.",
    "Resume keywords can be optimized.",
];

export default function AISuggestions() {
    return (
        <div className="rounded-3xl bg-white p-8 shadow-sm">

            <div className="flex items-center gap-3">

                <Sparkles className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                    AI Suggestions
                </h2>

            </div>

            <div className="mt-8 space-y-4">

                {suggestions.map((text) => (

                    <div
                        key={text}
                        className="rounded-xl bg-slate-100 p-4"
                    >
                        {text}
                    </div>

                ))}

            </div>

        </div>
    );
}