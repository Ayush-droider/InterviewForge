import { BrainCircuit, FileText, Trophy } from "lucide-react";
import { motion } from "framer-motion";

export default function AuthIllustration() {
    return (
        <div className="relative h-[600px] w-full">

            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-200 via-violet-100 to-cyan-100 blur-3xl" />

            <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{
                    repeat: Infinity,
                    duration: 5,
                }}
                className="absolute left-10 top-20 rounded-3xl bg-white p-6 shadow-xl"
            >
                <BrainCircuit className="text-indigo-600" size={40} />
                <h3 className="mt-3 font-bold">
                    AI Interview
                </h3>
            </motion.div>

            <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{
                    repeat: Infinity,
                    duration: 6,
                }}
                className="absolute right-8 top-40 rounded-3xl bg-white p-6 shadow-xl"
            >
                <FileText className="text-violet-600" size={40} />
                <h3 className="mt-3 font-bold">
                    Resume Score
                </h3>
            </motion.div>

            <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{
                    repeat: Infinity,
                    duration: 4,
                }}
                className="absolute bottom-16 left-24 rounded-3xl bg-white p-6 shadow-xl"
            >
                <Trophy className="text-cyan-600" size={40} />
                <h3 className="mt-3 font-bold">
                    Performance
                </h3>
            </motion.div>

        </div>
    );
}