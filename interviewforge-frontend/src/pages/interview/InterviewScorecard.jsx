import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "@/layouts/DashboardLayout";
import { getScorecard } from "@/services/interviewService";

import {
    Trophy,
    CheckCircle2,
    ArrowLeft,
    Brain,
    MessageCircle,
    ClipboardCheck,
} from "lucide-react";

import toast from "react-hot-toast";

export default function InterviewScorecard() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [scorecard, setScorecard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadScorecard();
    }, []);

    const loadScorecard = async () => {
        try {
            const data = await getScorecard(id);
            setScorecard(data);
        } catch (error) {
            console.error(error);
            toast.error("Unable to load scorecard.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex h-[70vh] items-center justify-center text-xl font-semibold">
                    Loading Interview Scorecard...
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="mx-auto max-w-6xl space-y-8">

                {/* Header */}

                <div className="flex items-center justify-between">

                    <div>
                        <h1 className="text-4xl font-bold">
                            Interview Scorecard
                        </h1>

                        <p className="mt-2 text-slate-500">
                            {scorecard.targetRole}
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 transition hover:bg-slate-100"
                    >
                        <ArrowLeft size={18} />
                        Dashboard
                    </button>

                </div>

                {/* Overall Score */}

                <div className="rounded-3xl bg-white p-10 shadow-sm">

                    <div className="flex items-center gap-6">

                        <div className="rounded-2xl bg-yellow-100 p-5">
                            <Trophy
                                size={40}
                                className="text-yellow-600"
                            />
                        </div>

                        <div>

                            <h2 className="text-5xl font-bold">
                                {scorecard.overallScore}/100
                            </h2>

                            <p className="mt-2 text-slate-500">
                                Overall Interview Score
                            </p>

                        </div>

                    </div>

                </div>

                {/* Dimension Breakdown */}

                <div className="grid gap-6 md:grid-cols-3">

                    <div className="rounded-3xl bg-white p-6 shadow-sm">

                        <div className="flex items-center gap-3">

                            <Brain className="text-indigo-600" />

                            <h3 className="font-semibold">
                                Technical Accuracy
                            </h3>

                        </div>

                        <p className="mt-5 text-4xl font-bold">
                            {Math.round(scorecard.dimensionBreakdown.avgTechnicalAccuracy)}%
                        </p>

                    </div>

                    <div className="rounded-3xl bg-white p-6 shadow-sm">

                        <div className="flex items-center gap-3">

                            <MessageCircle className="text-cyan-600" />

                            <h3 className="font-semibold">
                                Communication
                            </h3>

                        </div>

                        <p className="mt-5 text-4xl font-bold">
                            {Math.round(scorecard.dimensionBreakdown.avgCommunicationClarity)}%
                        </p>

                    </div>

                    <div className="rounded-3xl bg-white p-6 shadow-sm">

                        <div className="flex items-center gap-3">

                            <ClipboardCheck className="text-emerald-600" />

                            <h3 className="font-semibold">
                                Completeness
                            </h3>

                        </div>

                        <p className="mt-5 text-4xl font-bold">
                            {Math.round(scorecard.dimensionBreakdown.avgCompleteness)}%
                        </p>

                    </div>

                </div>

                {/* AI Feedback */}

                <div className="rounded-3xl bg-white p-8 shadow-sm">

                    <h2 className="mb-5 text-2xl font-bold">
                        AI Feedback
                    </h2>

                    <p className="leading-8 text-slate-600">
                        {scorecard.overallFeedback}
                    </p>

                </div>

                {/* Topic Breakdown */}

                <div className="rounded-3xl bg-white p-8 shadow-sm">

                    <h2 className="mb-6 text-2xl font-bold">
                        Topic Performance
                    </h2>

                    <div className="space-y-6">

                        {scorecard.topicBreakdowns?.map((topic) => (

                            <div key={topic.topic}>

                                <div className="mb-2 flex items-center justify-between">

                                    <div>

                                        <h3 className="font-semibold">
                                            {topic.topic}
                                        </h3>

                                        <p className="text-sm text-slate-500">
                                            {topic.questionCount} Questions
                                        </p>

                                    </div>

                                    <span className="font-semibold">
                                        {Math.round(topic.averageScore)}%
                                    </span>

                                </div>

                                <div className="h-3 rounded-full bg-slate-200">

                                    <div
                                        className="h-3 rounded-full bg-indigo-600 transition-all"
                                        style={{
                                            width: `${topic.averageScore}%`,
                                        }}
                                    />

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

                {/* Question Review */}

                <div className="rounded-3xl bg-white p-8 shadow-sm">

                    <h2 className="mb-6 text-2xl font-bold">
                        Interview Questions
                    </h2>

                    <div className="space-y-5">

                        {scorecard.questions?.map((question) => (

                            <div
                                key={question.id}
                                className="rounded-2xl border border-slate-200 p-6 transition hover:border-indigo-400"
                            >

                                <div className="mb-3 flex items-center gap-3">

                                    <CheckCircle2
                                        className="text-green-600"
                                    />

                                    <span className="font-semibold">
                                        Question {question.sequenceNumber}
                                    </span>

                                </div>

                                <p className="leading-7 text-slate-700">
                                    {question.questionText}
                                </p>

                                <div className="mt-4 flex gap-3">

                                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700">
                                        {question.topic}
                                    </span>

                                    <span className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700">
                                        {question.difficulty}
                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>
        </DashboardLayout>
    );
}