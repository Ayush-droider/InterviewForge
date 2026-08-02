import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

export default function PerformanceChart({ interviews = [] }) {

    const data = interviews
        .filter(interview => interview.overallScore != null)
        .map((interview, index) => ({
            name: `#${index + 1}`,
            score: interview.overallScore,
        }));

    return (
        <div className="rounded-3xl bg-white p-8 shadow-sm">

            <div className="mb-8">

                <h2 className="text-2xl font-bold">
                    Interview Performance
                </h2>

                <p className="mt-2 text-slate-500">
                    Your interview scores over time.
                </p>

            </div>

            {data.length === 0 ? (

                <div className="flex h-80 items-center justify-center text-slate-500">

                    No interview data available.

                </div>

            ) : (

                <ResponsiveContainer
                    width="100%"
                    height={350}
                >

                    <LineChart data={data}>

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="name"
                        />

                        <YAxis
                            domain={[0, 100]}
                        />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#4F46E5"
                            strokeWidth={4}
                            dot={{ r: 5 }}
                            activeDot={{ r: 8 }}
                        />

                    </LineChart>

                </ResponsiveContainer>

            )}

        </div>
    );
}