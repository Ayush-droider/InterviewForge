import DashboardLayout from "@/layouts/DashboardLayout";
import {
    Settings as SettingsIcon,
    Moon,
    Bell,
    Shield,
    LogOut,
} from "lucide-react";

export default function Settings() {

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <DashboardLayout>

            <div className="mx-auto max-w-5xl space-y-8">

                <div>

                    <h1 className="text-4xl font-bold">
                        Settings
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Manage your InterviewForge preferences.
                    </p>

                </div>

                <div className="rounded-3xl bg-white p-8 shadow-sm">

                    <div className="space-y-6">

                        <div className="flex items-center justify-between rounded-2xl border p-6">

                            <div className="flex items-center gap-4">

                                <Moon className="text-indigo-600" />

                                <div>

                                    <h2 className="font-semibold">
                                        Dark Mode
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        Coming soon
                                    </p>

                                </div>

                            </div>

                            <button
                                disabled
                                className="rounded-xl bg-slate-200 px-4 py-2 text-slate-500"
                            >
                                Soon
                            </button>

                        </div>

                        <div className="flex items-center justify-between rounded-2xl border p-6">

                            <div className="flex items-center gap-4">

                                <Bell className="text-cyan-600" />

                                <div>

                                    <h2 className="font-semibold">
                                        Notifications
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        Coming soon
                                    </p>

                                </div>

                            </div>

                            <button
                                disabled
                                className="rounded-xl bg-slate-200 px-4 py-2 text-slate-500"
                            >
                                Soon
                            </button>

                        </div>

                        <div className="flex items-center justify-between rounded-2xl border p-6">

                            <div className="flex items-center gap-4">

                                <Shield className="text-emerald-600" />

                                <div>

                                    <h2 className="font-semibold">
                                        Privacy
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        Secure JWT Authentication
                                    </p>

                                </div>

                            </div>

                        </div>

                        <button
                            onClick={logout}
                            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-500 py-4 font-semibold text-white transition hover:bg-red-600"
                        >

                            <LogOut size={20} />

                            Logout

                        </button>

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
}