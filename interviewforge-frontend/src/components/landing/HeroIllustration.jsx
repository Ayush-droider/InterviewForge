import { motion } from "framer-motion";
import {
    BrainCircuit,
    FileText,
    Trophy,
    Mic,
} from "lucide-react";

function FloatingCard({ icon: Icon, title, value, className }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className={`absolute rounded-3xl border border-slate-200 bg-white p-5 shadow-xl ${className}`}
        >
            <Icon className="mb-3 text-indigo-600" size={28} />
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-slate-500">{value}</p>
        </motion.div>
    );
}

export default function HeroIllustration() {
    return (
        <div className="relative hidden h-[550px] w-full lg:block">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-200 via-violet-100 to-cyan-100 blur-3xl" />

            <FloatingCard
                icon={BrainCircuit}
                title="AI Interview"
                value="Mock Session"
                className="left-10 top-10"
            />

            <FloatingCard
                icon={FileText}
                title="Resume"
                value="91% Score"
                className="right-12 top-24"
            />

            <FloatingCard
                icon={Mic}
                title="Questions"
                value="1200+"
                className="left-24 bottom-20"
            />

            <FloatingCard
                icon={Trophy}
                title="Performance"
                value="84%"
                className="right-8 bottom-12"
            />
        </div>
    );
}