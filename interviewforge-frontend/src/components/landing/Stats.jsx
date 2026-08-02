import { motion } from "framer-motion";

const stats = [
    {
        value: "15K+",
        label: "Students",
    },
    {
        value: "50K+",
        label: "Mock Interviews",
    },
    {
        value: "98%",
        label: "Success Rate",
    },
    {
        value: "1200+",
        label: "Interview Questions",
    },
];

export default function Stats() {
    return (
        <section className="border-y border-slate-200 bg-white">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 py-20 md:grid-cols-4">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: index * 0.15,
                        }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h2 className="text-5xl font-bold text-indigo-600">
                            {stat.value}
                        </h2>

                        <p className="mt-3 text-slate-500">
                            {stat.label}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}