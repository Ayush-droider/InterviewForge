import api from "@/api/axios";

export const startInterview = async (payload) => {
    const response = await api.post("/interviews", payload);
    return response.data;
};

export const getInterview = async (interviewId) => {
    const response = await api.get(`/interviews/${interviewId}`);
    return response.data;
};

export const submitAnswer = async (interviewId, payload) => {
    const response = await api.post(
        `/interviews/${interviewId}/answer`,
        payload
    );
    return response.data;
};

export const getScorecard = async (interviewId) => {
    const response = await api.get(
        `/interviews/${interviewId}/scorecard`
    );
    return response.data;
};

export const getInterviewHistory = async () => {
    const response = await api.get("/interviews");
    return response.data.content;
};