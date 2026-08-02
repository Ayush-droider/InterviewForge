import api from "@/api/axios";
import ENDPOINTS from "@/api/endpoints";

export const login = async (credentials) => {
    const response = await api.post(ENDPOINTS.LOGIN, credentials);
    return response.data;
};

export const register = async (data) => {
    const response = await api.post("/auth/register", data);
    return response.data;
};