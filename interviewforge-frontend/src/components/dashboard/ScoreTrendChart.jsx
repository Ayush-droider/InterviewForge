import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

export default function ScoreTrendChart({ interviews = [] }) {
    const data = interviews
        .filter((item) => item.overallScore != null)
        .map((item, index) => ({
            interview: index + 1,
            score: item.overallScore,
        }));

    return (
        <div className="rounded-3xl bg-white p-8 shadow-sm">

            <h2 className="mb-6 text-2xl font-bold">
                Interview Score Trend
            </h2>

            <ResponsiveContainer width="100%" height={320}>
                <LineChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="interview" />

                    <YAxis domain={[0, 100]} />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#4F46E5"
                        strokeWidth={3}
                    />

                </LineChart>
            </ResponsiveContainer>

        </div>
    );
}