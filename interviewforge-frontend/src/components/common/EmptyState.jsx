import { Inbox } from "lucide-react";

export default function EmptyState({
    title,
    description,
}) {
    return (
        <div className="rounded-3xl bg-white p-16 text-center shadow-sm">

            <Inbox
                size={60}
                className="mx-auto text-slate-300"
            />

            <h2 className="mt-6 text-2xl font-bold">
                {title}
            </h2>

            <p className="mt-3 text-slate-500">
                {description}
            </p>

        </div>
    );
}