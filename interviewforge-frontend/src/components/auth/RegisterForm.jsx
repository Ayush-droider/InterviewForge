import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { register } from "@/services/authService";

export default function RegisterForm() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!form.fullName.trim()) {
            return toast.error("Full name is required.");
        }

        if (!form.email.trim()) {
            return toast.error("Email is required.");
        }

        if (form.password.length < 8) {
            return toast.error(
                "Password must be at least 8 characters."
            );
        }

        if (form.password !== form.confirmPassword) {
            return toast.error("Passwords do not match.");
        }

        try {

            setLoading(true);

            const response = await register({
                fullName: form.fullName,
                email: form.email,
                password: form.password,
            });

            localStorage.setItem("token", response.token);

            toast.success("Account created successfully!");

            navigate("/dashboard", {
                replace: true,
            });

        } catch (error) {

            toast.error(
                error.response?.data?.message ??
                "Registration failed."
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
                    Full Name
                </label>

                <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 p-3 focus:border-indigo-600 focus:outline-none"
                    placeholder="Ayush Pandey"
                />

            </div>

            <div>

                <label className="mb-2 block font-medium">
                    Email
                </label>

                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 p-3 focus:border-indigo-600 focus:outline-none"
                    placeholder="ayush@gmail.com"
                />

            </div>

            <div>

                <label className="mb-2 block font-medium">
                    Password
                </label>

                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 p-3 focus:border-indigo-600 focus:outline-none"
                />

            </div>

            <div>

                <label className="mb-2 block font-medium">
                    Confirm Password
                </label>

                <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 p-3 focus:border-indigo-600 focus:outline-none"
                />

            </div>

            <button
                disabled={loading}
                className="flex w-full items-center justify-center rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
            >

                {loading ? (
                    <>
                        <Loader2
                            className="mr-2 h-5 w-5 animate-spin"
                        />
                        Creating Account...
                    </>
                ) : (
                    "Create Account"
                )}

            </button>

            <p className="text-center text-sm text-slate-500">

                Already have an account?{" "}

                <Link
                    to="/login"
                    className="font-semibold text-indigo-600 hover:underline"
                >
                    Login
                </Link>

            </p>

        </form>

    );

}