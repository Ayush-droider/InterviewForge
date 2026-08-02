export default function ErrorFallback({
    error,
    resetErrorBoundary,
}) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6">

            <div className="max-w-lg rounded-3xl bg-white p-10 text-center shadow-lg">

                <h1 className="text-6xl font-bold text-red-500">
                    Oops!
                </h1>

                <h2 className="mt-5 text-2xl font-bold">
                    Something went wrong
                </h2>

                <p className="mt-4 text-slate-500">
                    An unexpected error occurred while rendering this page.
                </p>

                {import.meta.env.DEV && (
                    <pre className="mt-6 overflow-auto rounded-xl bg-slate-100 p-4 text-left text-sm text-red-600">
                        {error.message}
                    </pre>
                )}

                <button
                    onClick={resetErrorBoundary}
                    className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
                >
                    Try Again
                </button>

            </div>

        </div>
    );
}