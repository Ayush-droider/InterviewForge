import { BrainCircuit } from "lucide-react";

function Logo() {
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg">
                <BrainCircuit size={22} />
            </div>

            <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900">
                    InterviewForge
                </h1>

                <p className="text-xs text-slate-500">
                    AI Interview Platform
                </p>
            </div>
        </div>
    );
}

export default Logo;