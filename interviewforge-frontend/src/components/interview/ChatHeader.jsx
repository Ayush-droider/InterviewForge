import { Bot } from "lucide-react";

export default function ChatHeader({ role }) {

    return (

        <div className="flex items-center justify-between border-b bg-white px-6 py-5">

            <div className="flex items-center gap-4">

                <div className="rounded-full bg-indigo-600 p-3 text-white">

                    <Bot size={24} />

                </div>

                <div>

                    <h2 className="text-xl font-bold">
                        InterviewForge AI
                    </h2>

                    <p className="text-sm text-slate-500">
                        {role}
                    </p>

                </div>

            </div>

            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">

                Live Interview

            </span>

        </div>

    );

}