import { useEffect, useState } from "react";
import {
    FileText,
    RefreshCw,
    CheckCircle2,
    Clock3,
    XCircle,
    ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getResumeHistory } from "@/services/resumeService";

const statusConfig = {
    COMPLETED: {
        className: "bg-green-100 text-green-700",
        icon: CheckCircle2,
    },
    PENDING: {
        className: "bg-yellow-100 text-yellow-700",
        icon: Clock3,
    },
    FAILED: {
        className: "bg-red-100 text-red-700",
        icon: XCircle,
    },
};

export default function ResumeHistory({ refreshKey }) {
    const navigate = useNavigate();

    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadResumeHistory();
    }, [refreshKey]);

    const loadResumeHistory = async () => {
        try {
            setLoading(true);

            const data = await getResumeHistory();

            setResumes(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-3xl bg-white p-8 shadow-sm">

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <h2 className="text-2xl font-bold">
                        Recent Uploads
                    </h2>

                    <p className="text-slate-500">
                        View and manage your uploaded resumes
                    </p>

                </div>

                <button
                    onClick={loadResumeHistory}
                    disabled={loading}
                    className="rounded-xl border border-slate-200 p-3 transition hover:bg-slate-100 disabled:opacity-50"
                >
                    <RefreshCw
                        size={18}
                        className={loading ? "animate-spin" : ""}
                    />
                </button>

            </div>

            {loading ? (

                <div className="py-16 text-center text-slate-500">
                    Loading resumes...
                </div>

            ) : resumes.length === 0 ? (

                <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center">

                    <FileText
                        size={60}
                        className="mx-auto text-slate-300"
                    />

                    <h3 className="mt-6 text-xl font-semibold">
                        No Resumes Uploaded
                    </h3>

                    <p className="mt-2 text-slate-500">
                        Upload your first resume to begin AI analysis.
                    </p>

                </div>

            ) : (

                <div className="overflow-hidden rounded-2xl border border-slate-200">

                    <table className="w-full">

                        <thead className="bg-slate-50">

                            <tr className="text-left text-sm uppercase tracking-wide text-slate-500">

                                <th className="px-6 py-4">
                                    Resume
                                </th>

                                <th className="px-6 py-4">
                                    Status
                                </th>

                                <th className="px-6 py-4">
                                    Uploaded
                                </th>

                                <th className="w-10" />

                            </tr>

                        </thead>

                        <tbody>

                            {resumes.map((resume) => {

                                const status =
                                    statusConfig[resume.analysisStatus] ?? {
                                        className:
                                            "bg-slate-100 text-slate-700",
                                        icon: FileText,
                                    };

                                const StatusIcon = status.icon;

                                return (

                                    <tr
                                        key={resume.id}
                                        onClick={() =>
                                            navigate(`/resume/${resume.id}`)
                                        }
                                        className="group cursor-pointer border-t transition hover:bg-indigo-50"
                                    >

                                        <td className="px-6 py-5">

                                            <div className="flex items-center gap-3">

                                                <div className="rounded-xl bg-indigo-100 p-3">

                                                    <FileText
                                                        size={20}
                                                        className="text-indigo-600"
                                                    />

                                                </div>

                                                <span className="font-medium">
                                                    {resume.fileName}
                                                </span>

                                            </div>

                                        </td>

                                        <td className="px-6">

                                            <span
                                                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${status.className}`}
                                            >

                                                <StatusIcon size={15} />

                                                {resume.analysisStatus}

                                            </span>

                                        </td>

                                        <td className="px-6 text-slate-500">

                                            {new Date(
                                                resume.uploadedAt
                                            ).toLocaleString()}

                                        </td>

                                        <td className="pr-6">

                                            <ChevronRight
                                                size={20}
                                                className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-indigo-600"
                                            />

                                        </td>

                                    </tr>

                                );

                            })}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
}