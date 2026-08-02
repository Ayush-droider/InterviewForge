import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, Loader2 } from "lucide-react";
import {
    uploadResume,
    analyzeResume,
    waitForAnalysis,
} from "@/services/resumeService";
import toast from "react-hot-toast";

export default function UploadZone({ onUploadSuccess }) {
    const [uploading, setUploading] = useState(false);
    const [stage, setStage] = useState("idle");

    const onDrop = async (acceptedFiles) => {
        if (acceptedFiles.length === 0) {
            toast.error("Please upload a PDF file.");
            return;
        }

        const file = acceptedFiles[0];

        try {
            setUploading(true);
            setStage("uploading");

            // Step 1 - Upload Resume
            const uploadedResume = await uploadResume(file);

            toast.success("Resume uploaded successfully.");

            // Step 2 - Trigger AI Analysis
            setStage("analyzing");

            await analyzeResume(uploadedResume.id);

            toast.loading("Analyzing your resume...", {
                id: "analysis",
            });

            // Step 3 - Wait for Analysis to Finish
            const analyzedResume = await waitForAnalysis(
                uploadedResume.id
            );

            toast.success("🎉 Resume analysis completed!", {
                id: "analysis",
            });

            if (onUploadSuccess) {
                onUploadSuccess(analyzedResume);
            }
        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Failed to upload resume."
            );
        } finally {
            setUploading(false);
            setStage("idle");
        }
    };

    const { getRootProps, getInputProps, isDragActive } =
        useDropzone({
            accept: {
                "application/pdf": [".pdf"],
            },
            multiple: false,
            disabled: uploading,
            onDrop,
        });

    return (
        <div
            {...getRootProps()}
            className={`cursor-pointer rounded-3xl border-2 border-dashed bg-white p-20 text-center transition-all duration-300
      ${isDragActive
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-indigo-300 hover:border-indigo-600"
                }
      ${uploading ? "cursor-not-allowed opacity-70" : ""}`}
        >
            <input {...getInputProps()} />

            {uploading ? (
                <>
                    <Loader2
                        size={70}
                        className="mx-auto animate-spin text-indigo-600"
                    />

                    <h2 className="mt-6 text-3xl font-bold">
                        {stage === "uploading"
                            ? "Uploading Resume..."
                            : "Analyzing Resume..."}
                    </h2>

                    <p className="mt-3 text-slate-500">
                        {stage === "uploading"
                            ? "Uploading your PDF securely..."
                            : "Our AI is analyzing your resume. This may take a few moments."}
                    </p>
                </>
            ) : (
                <>
                    <UploadCloud
                        className="mx-auto text-indigo-600"
                        size={70}
                    />

                    <h2 className="mt-6 text-3xl font-bold">
                        {isDragActive
                            ? "Drop your resume here"
                            : "Upload Resume"}
                    </h2>

                    <p className="mt-2 text-slate-500">
                        Drag & Drop your PDF here or click to browse
                    </p>

                    <p className="mt-4 text-sm text-slate-400">
                        Supported format: PDF (Max 10 MB)
                    </p>
                </>
            )}
        </div>
    );
}