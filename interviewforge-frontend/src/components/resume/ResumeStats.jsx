export default function ResumeStats() {
    return (
        <div className="grid gap-6 md:grid-cols-4">

            <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h2 className="text-4xl font-bold">
                    91%
                </h2>

                <p className="text-slate-500">
                    Resume Score
                </p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h2 className="text-4xl font-bold">
                    88%
                </h2>

                <p className="text-slate-500">
                    ATS Score
                </p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h2 className="text-4xl font-bold">
                    14
                </h2>

                <p className="text-slate-500">
                    Skills
                </p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h2 className="text-4xl font-bold">
                    Today
                </h2>

                <p className="text-slate-500">
                    Uploaded
                </p>
            </div>

        </div>
    );
}