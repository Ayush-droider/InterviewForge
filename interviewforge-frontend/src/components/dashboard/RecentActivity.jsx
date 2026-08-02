import {
    Clock3,
    FileText,
    Mic,
} from "lucide-react";

export default function RecentActivity({
    resumes = [],
    interviews = [],
}) {

    const activities = [];

    resumes.forEach(resume => {

        activities.push({
            type: "Resume Uploaded",
            date: resume.uploadedAt,
            icon: FileText,
        });

    });

    interviews.forEach(interview => {

        activities.push({
            type: `Interview ${interview.status}`,
            date: interview.startedAt,
            icon: Mic,
        });

    });

    activities.sort(
        (a, b) =>
            new Date(b.date) -
            new Date(a.date)
    );

    return (

        <div className="rounded-3xl bg-white p-8 shadow-sm">

            <h2 className="mb-6 text-2xl font-bold">
                Recent Activity
            </h2>

            {activities.length === 0 ? (

                <div className="py-10 text-center text-slate-500">

                    No recent activity.

                </div>

            ) : (

                <div className="space-y-5">

                    {activities.slice(0, 6).map((activity, index) => {

                        const Icon = activity.icon;

                        return (

                            <div
                                key={index}
                                className="flex items-center gap-4"
                            >

                                <div className="rounded-xl bg-indigo-100 p-3">

                                    <Icon
                                        className="text-indigo-600"
                                        size={20}
                                    />

                                </div>

                                <div className="flex-1">

                                    <p className="font-medium">

                                        {activity.type}

                                    </p>

                                    <p className="text-sm text-slate-500">

                                        {new Date(
                                            activity.date
                                        ).toLocaleString()}

                                    </p>

                                </div>

                                <Clock3
                                    size={18}
                                    className="text-slate-400"
                                />

                            </div>

                        );

                    })}

                </div>

            )}

        </div>

    );

}