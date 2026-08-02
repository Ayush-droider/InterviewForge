export default function AuthLayout({ left, right }) {
    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-2">

                <div className="hidden lg:flex items-center justify-center p-12">
                    {left}
                </div>

                <div className="flex items-center justify-center p-8">
                    {right}
                </div>

            </div>
        </div>
    );
}