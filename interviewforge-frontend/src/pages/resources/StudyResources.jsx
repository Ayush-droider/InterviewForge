import { useState } from "react";

import DashboardLayout from "@/layouts/DashboardLayout";

import UploadResource from "@/components/resources/UploadResource";
import ResourceList from "@/components/resources/ResourceList";

export default function StudyResources() {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleUploadSuccess = () => {
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <DashboardLayout>

            <div className="space-y-8">

                <div>

                    <h1 className="text-4xl font-bold">
                        Study Resources
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Upload and organize your interview preparation materials.
                    </p>

                </div>

                <div className="grid gap-8 lg:grid-cols-3">

                    {/* Upload Panel */}

                    <div className="lg:col-span-1">

                        <UploadResource
                            onSuccess={handleUploadSuccess}
                        />

                    </div>

                    {/* Resources List */}

                    <div className="lg:col-span-2">

                        <ResourceList
                            refreshKey={refreshKey}
                        />

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
}