import { createContext, useContext, useState } from "react";
import { login as loginService } from "@/services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = async (credentials) => {
        const response = await loginService(credentials);

        localStorage.setItem("token", response.token);

        setUser({
            id: response.userId,
            email: response.email,
            fullName: response.fullName,
            role: response.role,
        });

        return response;
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);