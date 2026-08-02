import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "@/layouts/DashboardLayout";

import { getResumeById } from "@/services/resumeService";

import {
    FileText,
    Calendar,
    CheckCircle2,
    ArrowLeft,
    PlayCircle,
} from "lucide-react";

import toast from "react-hot-toast";

export default function ResumeDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [resume, setResume] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadResume();
    }, []);

    const loadResume = async () => {
        try {

            const data = await getResumeById(id);

            setResume(data);

        } catch (error) {

            console.error(error);

            toast.error("Unable to load resume.");

        } finally {

            setLoading(false);

        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="p-12 text-center">
                    Loading Resume...
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>

            <div className="mx-auto max-w-5xl space-y-8">

                <div className="flex items-center justify-between">

                    <div>

                        <h1 className="text-4xl font-bold">
                            Resume Details
                        </h1>

                        <p className="mt-2 text-slate-500">
                            View your uploaded resume.
                        </p>

                    </div>

                    <button
                        onClick={() => navigate("/resume")}
                        className="flex items-center gap-2 rounded-xl border px-5 py-3 hover:bg-slate-100"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </button>

                </div>

                <div className="rounded-3xl bg-white p-8 shadow-sm">

                    <div className="flex items-center gap-5">

                        <div className="rounded-2xl bg-indigo-100 p-4">

                            <FileText
                                size={34}
                                className="text-indigo-600"
                            />

                        </div>

                        <div>

                            <h2 className="text-2xl font-bold">
                                {resume.fileName}
                            </h2>

                            <div className="mt-3 flex gap-6 text-slate-500">

                                <div className="flex items-center gap-2">

                                    <Calendar size={18} />

                                    {new Date(
                                        resume.uploadedAt
                                    ).toLocaleString()}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="rounded-3xl bg-white p-8 shadow-sm">

                    <h2 className="mb-5 text-2xl font-bold">

                        Analysis Status

                    </h2>

                    <div className="inline-flex items-center gap-3 rounded-full bg-green-100 px-5 py-3 text-green-700">

                        <CheckCircle2 size={20} />

                        {resume.analysisStatus}

                    </div>

                </div>

                <div className="rounded-3xl bg-white p-8 shadow-sm">

                    <h2 className="mb-4 text-2xl font-bold">

                        Next Step

                    </h2>

                    <p className="text-slate-600">

                        Start an AI-powered mock interview based on this resume.

                    </p>

                    <button
                        onClick={() =>
                            navigate("/interview", {
                                state: {
                                    resumeId: resume.id,
                                },
                            })
                        }
                        className="mt-6 flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
                    >
                        <PlayCircle size={20} />
                        Start Interview
                    </button>

                </div>

            </div>

        </DashboardLayout>
    );
}