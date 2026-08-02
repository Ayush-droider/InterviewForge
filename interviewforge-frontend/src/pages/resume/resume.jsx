import { useEffect, useState } from "react";

import DashboardLayout from "@/layouts/DashboardLayout";
import UploadZone from "@/components/resume/UploadZone";
import ResumeStats from "@/components/resume/ResumeStats";
import ResumeHistory from "@/components/resume/ResumeHistory";

import { getResumeHistory } from "@/services/resumeService";

export default function Resume() {

    const [refreshKey, setRefreshKey] = useState(0);

    const [latestResume, setLatestResume] = useState(null);

    useEffect(() => {
        loadLatestResume();
    }, [refreshKey]);

    const loadLatestResume = async () => {

        try {

            const resumes = await getResumeHistory();

            console.log("========== ALL RESUMES ==========");
            console.log(resumes);

            const latestCompleted = resumes
                .filter(
                    (resume) => resume.analysisStatus === "COMPLETED"
                )
                .sort(
                    (a, b) =>
                        new Date(b.uploadedAt) - new Date(a.uploadedAt)
                )[0];

            console.log("========== LATEST COMPLETED ==========");
            console.log(latestCompleted);

            setLatestResume(latestCompleted || null);

        } catch (error) {

            console.error(error);

        }

    };

    const handleUploadSuccess = () => {

        setRefreshKey((prev) => prev + 1);

    };

    return (

        <DashboardLayout>

            <div className="space-y-8">

                <div>

                    <h1 className="text-4xl font-bold">
                        Resume Analysis
                    </h1>

                    <p className="text-slate-500">
                        Upload and analyze your resume using AI.
                    </p>

                </div>

                <UploadZone onUploadSuccess={handleUploadSuccess} />

                <ResumeStats
                    resume={latestResume}
                    refreshKey={refreshKey}
                />

                <ResumeHistory refreshKey={refreshKey} />

            </div>

        </DashboardLayout>

    );
}