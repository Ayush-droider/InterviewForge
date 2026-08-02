import api from "@/api/axios";

export const uploadResume = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/resumes", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

export const getResumeHistory = async () => {
    const response = await api.get("/resumes");
    return response.data.content;
};

export const getResumeById = async (id) => {
    const response = await api.get(`/resumes/${id}`);
    return response.data;
};

export const analyzeResume = async (id) => {
    await api.post(`/resumes/${id}/analyze`);
};

export const waitForAnalysis = async (
    id,
    onStatusChange,
    interval = 2000,
    timeout = 120000
) => {
    const start = Date.now();

    while (Date.now() - start < timeout) {
        const resume = await getResumeById(id);

        onStatusChange?.(resume);

        if (resume.analysisStatus === "COMPLETED") {
            return resume;
        }

        if (resume.analysisStatus === "FAILED") {
            throw new Error("Resume analysis failed.");
        }

        await new Promise((resolve) =>
            setTimeout(resolve, interval)
        );
    }

    throw new Error("Analysis timed out.");
};