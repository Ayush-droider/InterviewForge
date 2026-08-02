import { useState } from "react";
import { Menu, X } from "lucide-react";

import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-100">

            {/* Mobile Header */}
            <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white px-6 lg:hidden">

                <button onClick={() => setOpen(true)}>
                    <Menu size={28} />
                </button>

                <h1 className="text-lg font-bold text-indigo-600">
                    InterviewForge
                </h1>

            </header>

            <div className="flex">

                {/* Desktop Sidebar */}
                <aside className="hidden lg:block">
                    <Sidebar />
                </aside>

                {/* Mobile Sidebar */}
                {open && (
                    <>
                        <div
                            className="fixed inset-0 z-40 bg-black/40"
                            onClick={() => setOpen(false)}
                        />

                        <aside className="fixed left-0 top-0 z-50 h-screen">
                            <div className="relative">

                                <Sidebar />

                                <button
                                    onClick={() => setOpen(false)}
                                    className="absolute right-4 top-4 rounded-lg p-2 hover:bg-slate-100 lg:hidden"
                                >
                                    <X size={22} />
                                </button>

                            </div>
                        </aside>
                    </>
                )}

                {/* Main Content */}
                <main className="min-w-0 flex-1 p-6 lg:p-10">
                    {children}
                </main>

            </div>

        </div>
    );
}