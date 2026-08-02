import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">

            <h1 className="text-8xl font-extrabold text-indigo-600">
                404
            </h1>

            <h2 className="mt-6 text-3xl font-bold">
                Page Not Found
            </h2>

            <p className="mt-4 text-slate-500">
                The page you are looking for doesn't exist.
            </p>

            <Link
                to="/dashboard"
                className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
            >
                Back to Dashboard
            </Link>

        </div>
    );
}