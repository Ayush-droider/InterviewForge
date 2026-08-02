import api from "@/api/axios";

/**
 * Upload a study resource
 */
export const uploadStudyResource = async (file, topic) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("topic", topic);

    const response = await api.post(
        "/study-resources",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

/**
 * Get all uploaded study resources
 */
export const getStudyResources = async () => {
    const response = await api.get("/study-resources");

    return response.data.content;
};