import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },
});

/*
|--------------------------------------------------------------------------
| Request Interceptor
|--------------------------------------------------------------------------
*/

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

/*
|--------------------------------------------------------------------------
| Response Interceptor
|--------------------------------------------------------------------------
*/

api.interceptors.response.use(
    (response) => response,

    (error) => {
        const status = error.response?.status;

        switch (status) {
            case 401:
                // Token expired or invalid
                localStorage.removeItem("token");

                if (window.location.pathname !== "/login") {
                    window.location.href = "/login";
                }
                break;

            case 403:
                console.error("Access Forbidden");
                break;

            case 404:
                console.error("Resource Not Found");
                break;

            case 500:
                console.error("Internal Server Error");
                break;

            default:
                console.error(
                    error.response?.data?.message ||
                    error.message ||
                    "Unexpected Error"
                );
        }

        return Promise.reject(error);
    }
);

export default api;