export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50">
            <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-10">
                <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">

                    {/* Left Side */}
                    <div className="hidden bg-gradient-to-br from-indigo-600 to-violet-700 p-12 text-white lg:flex lg:flex-col lg:justify-center">
                        <h1 className="text-5xl font-bold">
                            InterviewForge
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-indigo-100">
                            Practice AI-powered mock interviews, analyze your
                            resume, improve your ATS score, and prepare for your
                            dream job.
                        </p>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center justify-center p-10">
                        <div className="w-full max-w-md">
                            {children}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}