import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import { getResumeHistory } from "@/services/resumeService";
import { startInterview } from "@/services/interviewService";
import toast from "react-hot-toast";

export default function InterviewSetup() {
    const navigate = useNavigate();

    const [resumes, setResumes] = useState([]);
    const [resumeId, setResumeId] = useState("");
    const [targetRole, setTargetRole] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadResumes();
    }, []);

    const loadResumes = async () => {
        try {
            const data = await getResumeHistory();
            setResumes(data);

            if (data.length > 0) {
                setResumeId(data[0].id);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load resumes.");
        }
    };

    const handleStartInterview = async () => {
        if (!resumeId) {
            toast.error("Please select a resume.");
            return;
        }

        if (!targetRole.trim()) {
            toast.error("Please enter a target role.");
            return;
        }

        try {
            setLoading(true);

            const interview = await startInterview({
                resumeId,
                targetRole,
            });

            toast.success("Interview started!");

            navigate(`/interview/${interview.id}`, {
                state: {
                    interview,
                },
            });
        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to start interview."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">

                <h1 className="text-3xl font-bold">
                    Start Mock Interview
                </h1>

                <p className="mt-2 text-slate-500">
                    Choose a resume and enter your target role.
                </p>

                <div className="mt-8 space-y-6">

                    <div>
                        <label className="font-medium">
                            Resume
                        </label>

                        <select
                            value={resumeId}
                            onChange={(e) => setResumeId(Number(e.target.value))}
                            className="mt-2 w-full rounded-xl border p-4"
                        >
                            {resumes.map((resume) => (
                                <option
                                    key={resume.id}
                                    value={resume.id}
                                >
                                    {resume.fileName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="font-medium">
                            Target Role
                        </label>

                        <input
                            type="text"
                            value={targetRole}
                            onChange={(e) => setTargetRole(e.target.value)}
                            placeholder="e.g. Java Backend Developer"
                            className="mt-2 w-full rounded-xl border p-4"
                        />
                    </div>

                    <button
                        onClick={handleStartInterview}
                        disabled={loading}
                        className="w-full rounded-xl bg-indigo-600 py-4 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {loading ? "Starting..." : "Start Interview"}
                    </button>

                </div>
            </div>
        </DashboardLayout>
    );
}