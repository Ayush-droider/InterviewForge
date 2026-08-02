import { useEffect, useState } from "react";

import DashboardLayout from "@/layouts/DashboardLayout";

import Greeting from "@/components/dashboard/Greeting";
import StatCard from "@/components/dashboard/StatCard";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import RecentActivity from "@/components/dashboard/RecentActivity";
import AISuggestions from "@/components/dashboard/AISuggestions";
import QuickActions from "@/components/dashboard/QuickActions";

import {
    FileText,
    Mic,
    Trophy,
    Clock3,
} from "lucide-react";

import { getResumeHistory } from "@/services/resumeService";
import { getInterviewHistory } from "@/services/interviewService";

export default function Dashboard() {

    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        totalResumes: 0,
        totalInterviews: 0,
        completedInterviews: 0,
        pendingResumes: 0,
        averageScore: 0,
        resumes: [],
        interviews: [],
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {

            const [resumes, interviews] = await Promise.all([
                getResumeHistory(),
                getInterviewHistory(),
            ]);

            const completed = interviews.filter(
                interview => interview.status === "COMPLETED"
            );

            const pending = resumes.filter(
                resume => resume.analysisStatus !== "COMPLETED"
            );

            const average =
                completed.length === 0
                    ? 0
                    : Math.round(
                        completed.reduce(
                            (sum, interview) =>
                                sum + (interview.overallScore || 0),
                            0
                        ) / completed.length
                    );

            setStats({
                totalResumes: resumes.length,
                totalInterviews: interviews.length,
                completedInterviews: completed.length,
                pendingResumes: pending.length,
                averageScore: average,
                resumes,
                interviews,
            });

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="py-20 text-center">
                    Loading Dashboard...
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>

            <div className="space-y-8">

                <Greeting />

                {/* Statistics */}

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

                    <StatCard
                        title="Resumes"
                        value={stats.totalResumes}
                        subtitle={`${stats.pendingResumes} Pending Analysis`}
                        icon={FileText}
                        color="bg-indigo-600"
                    />

                    <StatCard
                        title="Interviews"
                        value={stats.totalInterviews}
                        subtitle={`${stats.completedInterviews} Completed`}
                        icon={Mic}
                        color="bg-cyan-600"
                    />

                    <StatCard
                        title="Average Score"
                        value={`${stats.averageScore}%`}
                        subtitle="Completed Interviews"
                        icon={Trophy}
                        color="bg-emerald-600"
                    />

                    <StatCard
                        title="Pending Analysis"
                        value={stats.pendingResumes}
                        subtitle="Resume Processing"
                        icon={Clock3}
                        color="bg-orange-500"
                    />

                </div>

                {/* Charts */}

                <div className="grid gap-8 xl:grid-cols-3">

                    <div className="xl:col-span-2">

                        <PerformanceChart
                            interviews={stats.interviews}
                        />

                    </div>

                    <div className="space-y-8">

                        <AISuggestions />

                        <QuickActions />

                    </div>

                </div>

                {/* Activity */}

                <RecentActivity
                    resumes={stats.resumes}
                    interviews={stats.interviews}
                />

            </div>

        </DashboardLayout>
    );
}