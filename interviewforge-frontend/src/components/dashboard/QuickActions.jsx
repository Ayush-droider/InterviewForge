import { FilePlus2, Mic, Upload } from "lucide-react";

const actions = [
    {
        icon: Upload,
        title: "Upload Resume",
    },
    {
        icon: Mic,
        title: "Start Interview",
    },
    {
        icon: FilePlus2,
        title: "View Reports",
    },
];

export default function QuickActions() {
    return (
        <div className="rounded-3xl bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-bold">
                Quick Actions
            </h2>

            <div className="mt-8 grid gap-4">

                {actions.map(({ icon: Icon, title }) => (

                    <button
                        key={title}
                        className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-indigo-500 hover:bg-indigo-50"
                    >

                        <Icon className="text-indigo-600" />

                        {title}

                    </button>

                ))}

            </div>

        </div>
    );
}