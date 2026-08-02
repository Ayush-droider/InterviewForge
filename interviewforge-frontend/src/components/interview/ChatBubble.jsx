import { Bot, User } from "lucide-react";

export default function ChatBubble({ sender, message }) {

    const isAI = sender === "AI";

    return (

        <div className={`flex ${isAI ? "justify-start" : "justify-end"}`}>

            <div className={`flex max-w-3xl gap-3 ${isAI ? "" : "flex-row-reverse"}`}>

                <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${isAI
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-700 text-white"
                        }`}
                >
                    {isAI ? <Bot size={20} /> : <User size={20} />}
                </div>

                <div
                    className={`rounded-3xl px-5 py-4 shadow-sm ${isAI
                            ? "bg-white text-slate-800"
                            : "bg-indigo-600 text-white"
                        }`}
                >
                    <p className="whitespace-pre-wrap leading-7">
                        {message}
                    </p>
                </div>

            </div>

        </div>

    );

}