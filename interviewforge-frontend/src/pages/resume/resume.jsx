import { useState } from "react";

import DashboardLayout from "@/layouts/DashboardLayout";
import UploadZone from "@/components/resume/UploadZone";
import ResumeStats from "@/components/resume/ResumeStats";
import ResumeHistory from "@/components/resume/ResumeHistory";

export default function Resume() {
    const [refreshKey, setRefreshKey] = useState(0);

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

                <ResumeStats />

                <ResumeHistory refreshKey={refreshKey} />

            </div>
        </DashboardLayout>
    );
}