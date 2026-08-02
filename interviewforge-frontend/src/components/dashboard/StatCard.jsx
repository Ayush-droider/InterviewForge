import { motion } from "framer-motion";

export default function StatCard({
    title,
    value,
    subtitle,
    icon: Icon,
    color = "bg-indigo-600",
}) {
    return (
        <motion.div
            whileHover={{
                y: -6,
                scale: 1.02,
            }}
            transition={{ duration: 0.2 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
            <div className="flex items-start justify-between">

                <div>

                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>

                    <h2 className="mt-4 text-4xl font-bold text-slate-800">
                        {value}
                    </h2>

                    <p className="mt-2 text-sm text-emerald-600">
                        {subtitle}
                    </p>

                </div>

                <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color} text-white`}
                >
                    <Icon size={26} />
                </div>

            </div>
        </motion.div>
    );
}