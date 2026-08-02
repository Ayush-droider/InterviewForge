import { useState } from "react";
import {
    UploadCloud,
    Loader2,
    BookOpen,
} from "lucide-react";

import toast from "react-hot-toast";

import { uploadStudyResource } from "@/services/studyResourceService";

export default function UploadResource({ onSuccess }) {

    const [file, setFile] = useState(null);
    const [topic, setTopic] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {

        if (!file) {
            toast.error("Please select a PDF.");
            return;
        }

        if (!topic.trim()) {
            toast.error("Please enter a topic.");
            return;
        }

        try {

            setLoading(true);

            await uploadStudyResource(file, topic);

            toast.success("Study resource uploaded successfully.");

            setFile(null);
            setTopic("");

            if (onSuccess) {
                onSuccess();
            }

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Upload failed."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="rounded-3xl bg-white p-8 shadow-sm">

            <div className="mb-6 flex items-center gap-3">

                <div className="rounded-xl bg-indigo-100 p-3">

                    <BookOpen
                        className="text-indigo-600"
                        size={22}
                    />

                </div>

                <div>

                    <h2 className="text-2xl font-bold">
                        Upload Resource
                    </h2>

                    <p className="text-slate-500">
                        Upload notes or study material.
                    </p>

                </div>

            </div>

            <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="mb-5 w-full rounded-xl border p-3"
            />

            <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter Topic (e.g. Java, DBMS)"
                className="mb-6 w-full rounded-xl border p-3 outline-none focus:border-indigo-500"
            />

            <button
                onClick={handleUpload}
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-70"
            >

                {loading ? (

                    <>
                        <Loader2
                            className="animate-spin"
                            size={20}
                        />

                        Uploading...

                    </>

                ) : (

                    <>
                        <UploadCloud size={20} />

                        Upload Resource

                    </>

                )}

            </button>

        </div>

    );

}