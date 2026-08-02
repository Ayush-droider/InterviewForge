import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "@/layouts/DashboardLayout";
import { getInterviewHistory } from "@/services/interviewService";

import toast from "react-hot-toast";

export default function InterviewHistory() {

    const navigate = useNavigate();

    const [history, setHistory] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadHistory();

    }, []);

    const loadHistory = async () => {

        try {

            const data =
                await getInterviewHistory();

            setHistory(data);

        } catch (e) {

            console.error(e);

            toast.error("Failed to load interviews.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <DashboardLayout>

            <div className="rounded-3xl bg-white p-8 shadow-sm">

                <h1 className="text-3xl font-bold">

                    Interview History

                </h1>

                <table className="mt-8 w-full">

                    <thead>

                        <tr className="border-b text-left">

                            <th className="pb-4">
                                Target Role
                            </th>

                            <th>
                                Score
                            </th>

                            <th>
                                Questions
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Started
                            </th>

                            <th></th>

                        </tr>

                    </thead>

                    <tbody>

                        {history.map((item) => (

                            <tr
                                key={item.id}
                                className="border-b"
                            >

                                <td className="py-5">

                                    {item.targetRole}

                                </td>

                                <td>

                                    {item.overallScore ?? "--"}

                                </td>

                                <td>

                                    {item.questionsAnswered}

                                </td>

                                <td>

                                    {item.status}

                                </td>

                                <td>

                                    {new Date(
                                        item.startedAt
                                    ).toLocaleDateString()}

                                </td>

                                <td>

                                    <button
                                        onClick={() => navigate(
                                            `/interview/${item.id}/scorecard`
                                        )}
                                        className="rounded-lg bg-indigo-600 px-4 py-2 text-white"
                                    >

                                        View

                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </DashboardLayout>

    );

}