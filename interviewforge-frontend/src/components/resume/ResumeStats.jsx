export default function ResumeStats({ resume }) {

    const skillsCount = resume?.skills?.length ?? 0;

    return (

        <div className="grid gap-6 md:grid-cols-4">

            <div className="rounded-3xl bg-white p-6 shadow-sm">

                <h2 className="text-4xl font-bold text-indigo-600">
                    {resume ? `${resume.resumeScore}%` : "--"}
                </h2>

                <p className="mt-2 text-slate-500">
                    Resume Score
                </p>

            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">

                <h2 className="text-4xl font-bold text-green-600">
                    {resume ? `${resume.atsScore}%` : "--"}
                </h2>

                <p className="mt-2 text-slate-500">
                    ATS Score
                </p>

            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">

                <h2 className="text-4xl font-bold text-orange-500">
                    {skillsCount}
                </h2>

                <p className="mt-2 text-slate-500">
                    Skills Extracted
                </p>

            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">

                <h2 className="text-xl font-bold">
                    {resume
                        ? new Date(resume.uploadedAt).toLocaleDateString()
                        : "--"}
                </h2>

                <p className="mt-2 text-slate-500">
                    Latest Upload
                </p>

            </div>

        </div>

    );
}