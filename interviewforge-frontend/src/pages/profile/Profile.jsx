import { useEffect, useState } from "react";

import DashboardLayout from "@/layouts/DashboardLayout";

import {
    User,
    Mail,
    FileText,
    Mic,
    Trophy,
} from "lucide-react";

import { getCurrentUser } from "@/services/authService";
import { getResumeHistory } from "@/services/resumeService";
import { getInterviewHistory } from "@/services/interviewService";

export default function Profile() {

    const [user, setUser] = useState(null);

    const [stats, setStats] = useState({
        resumes: 0,
        interviews: 0,
        completed: 0,
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        try {

            const [
                currentUser,
                resumes,
                interviews,
            ] = await Promise.all([
                getCurrentUser(),
                getResumeHistory(),
                getInterviewHistory(),
            ]);

            setUser(currentUser);

            setStats({
                resumes: resumes.length,
                interviews: interviews.length,
                completed: interviews.filter(
                    interview => interview.status === "COMPLETED"
                ).length,
            });

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <DashboardLayout>

            <div className="mx-auto max-w-6xl space-y-8">

                {/* Profile Header */}

                <div className="rounded-3xl bg-white p-10 shadow-sm">

                    <div className="flex flex-col items-center">

                        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white">

                            <User size={60} />

                        </div>

                        <h1 className="mt-6 text-3xl font-bold">

                            {user?.fullName ?? "Loading..."}

                        </h1>

                        <p className="mt-2 flex items-center gap-2 text-slate-500">

                            <Mail size={18} />

                            {user?.email ?? "Loading..."}

                        </p>

                    </div>

                </div>

                {/* Statistics */}

                <div className="grid gap-6 md:grid-cols-3">

                    <div className="rounded-3xl bg-white p-8 shadow-sm">

                        <FileText
                            className="text-indigo-600"
                            size={34}
                        />

                        <h2 className="mt-5 text-5xl font-bold">
                            {stats.resumes}
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Resumes Uploaded
                        </p>

                    </div>

                    <div className="rounded-3xl bg-white p-8 shadow-sm">

                        <Mic
                            className="text-cyan-600"
                            size={34}
                        />

                        <h2 className="mt-5 text-5xl font-bold">
                            {stats.interviews}
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Interviews Taken
                        </p>

                    </div>

                    <div className="rounded-3xl bg-white p-8 shadow-sm">

                        <Trophy
                            className="text-yellow-500"
                            size={34}
                        />

                        <h2 className="mt-5 text-5xl font-bold">
                            {stats.completed}
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Completed Interviews
                        </p>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}