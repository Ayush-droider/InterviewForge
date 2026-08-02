export default function TypingIndicator() {

    return (

        <div className="flex">

            <div className="rounded-3xl bg-white px-5 py-4 shadow-sm">

                <div className="flex gap-2">

                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-500"></span>

                    <span
                        className="h-2 w-2 animate-bounce rounded-full bg-slate-500"
                        style={{ animationDelay: "150ms" }}
                    ></span>

                    <span
                        className="h-2 w-2 animate-bounce rounded-full bg-slate-500"
                        style={{ animationDelay: "300ms" }}
                    ></span>

                </div>

            </div>

        </div>

    );

}