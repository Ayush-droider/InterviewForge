import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { login } from "@/services/authService";

export default function LoginForm() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email.trim()) {
            return toast.error("Email is required.");
        }

        if (!form.password) {
            return toast.error("Password is required.");
        }

        try {
            setLoading(true);

            const response = await login(form);

            // Save Authentication Data
            localStorage.setItem("token", response.token);
            localStorage.setItem("tokenType", response.tokenType);
            localStorage.setItem("userId", response.userId);
            localStorage.setItem("email", response.email);
            localStorage.setItem("fullName", response.fullName);
            localStorage.setItem("role", response.role);

            toast.success(`Welcome back, ${response.fullName}!`);

            navigate("/dashboard", {
                replace: true,
            });

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Invalid email or password."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            <div>

                <label className="mb-2 block font-medium">
                    Email Address
                </label>

                <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 p-3 transition focus:border-indigo-500 focus:outline-none"
                />

            </div>

            <div>

                <div className="mb-2 flex items-center justify-between">

                    <label className="font-medium">
                        Password
                    </label>

                    {/* Backend not implemented yet */}
                    <button
                        type="button"
                        onClick={() =>
                            toast("Forgot Password will be available soon.")
                        }
                        className="text-sm text-indigo-600 hover:underline"
                    >
                        Forgot Password?
                    </button>

                </div>

                <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 p-3 transition focus:border-indigo-500 focus:outline-none"
                />

            </div>

            <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
                {loading ? (
                    <>
                        <Loader2
                            className="mr-2 h-5 w-5 animate-spin"
                        />
                        Signing In...
                    </>
                ) : (
                    "Sign In"
                )}
            </button>

            <p className="text-center text-sm text-slate-500">

                Don't have an account?{" "}

                <Link
                    to="/register"
                    className="font-semibold text-indigo-600 transition hover:underline"
                >
                    Create Account
                </Link>

            </p>

        </form>
    );
}