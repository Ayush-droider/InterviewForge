import {
    FileText,
    BookOpen,
    CalendarDays,
} from "lucide-react";

export default function ResourceCard({ resource }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-start gap-4">

                <div className="rounded-xl bg-indigo-100 p-3">

                    <FileText
                        size={24}
                        className="text-indigo-600"
                    />

                </div>

                <div className="flex-1">

                    <h3 className="text-lg font-semibold text-slate-800">
                        {resource.fileName}
                    </h3>

                    <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-500">

                        <div className="flex items-center gap-2">

                            <BookOpen size={16} />

                            {resource.topic}

                        </div>

                        <div className="flex items-center gap-2">

                            <CalendarDays size={16} />

                            {new Date(resource.uploadedAt).toLocaleDateString()}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}