import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts";

const COLORS = [
    "#4F46E5",
    "#06B6D4",
    "#22C55E",
];

export default function InterviewPieChart({
    interviews = [],
}) {

    const completed = interviews.filter(
        (i) => i.status === "COMPLETED"
    ).length;

    const pending = interviews.filter(
        (i) => i.status === "IN_PROGRESS"
    ).length;

    const cancelled = interviews.filter(
        (i) => i.status === "CANCELLED"
    ).length;

    const data = [
        {
            name: "Completed",
            value: completed,
        },
        {
            name: "In Progress",
            value: pending,
        },
        {
            name: "Cancelled",
            value: cancelled,
        },
    ];

    return (
        <div className="rounded-3xl bg-white p-8 shadow-sm">

            <h2 className="mb-6 text-2xl font-bold">
                Interview Status
            </h2>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        outerRadius={100}
                    >

                        {data.map((entry, index) => (
                            <Cell
                                key={entry.name}
                                fill={COLORS[index]}
                            />
                        ))}

                    </Pie>

                    <Tooltip />

                </PieChart>

            </ResponsiveContainer>

        </div>
    );
}