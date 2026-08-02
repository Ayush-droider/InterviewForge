import { useEffect, useState } from "react";
import { RefreshCw, BookOpen } from "lucide-react";

import ResourceCard from "./ResourceCard";
import { getStudyResources } from "@/services/studyResourceService";

export default function ResourceList({ refreshKey }) {

    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadResources();
    }, [refreshKey]);

    const loadResources = async () => {
        try {

            setLoading(true);

            const data = await getStudyResources();

            setResources(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };

    if (loading) {
        return (
            <div className="rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold">
                    Study Resources
                </h2>

                <p className="mt-6 text-slate-500">
                    Loading resources...
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-3xl bg-white p-8 shadow-sm">

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <h2 className="text-2xl font-bold">
                        Uploaded Resources
                    </h2>

                    <p className="text-slate-500">
                        Your interview preparation materials
                    </p>

                </div>

                <button
                    onClick={loadResources}
                    className="rounded-xl border border-slate-200 p-3 transition hover:bg-slate-100"
                >
                    <RefreshCw size={18} />
                </button>

            </div>

            {resources.length === 0 ? (

                <div className="py-16 text-center">

                    <BookOpen
                        size={60}
                        className="mx-auto text-slate-300"
                    />

                    <h3 className="mt-6 text-xl font-semibold">
                        No Study Resources
                    </h3>

                    <p className="mt-2 text-slate-500">
                        Upload your first study resource to begin learning.
                    </p>

                </div>

            ) : (

                <div className="space-y-5">

                    {resources.map((resource) => (

                        <ResourceCard
                            key={resource.id}
                            resource={resource}
                        />

                    ))}

                </div>

            )}

        </div>
    );
}