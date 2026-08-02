import Skeleton from "./Skeleton";

export default function PageLoader() {
    return (
        <div className="space-y-6">

            <Skeleton className="h-10 w-60" />

            <div className="grid gap-6 md:grid-cols-3">

                {[1, 2, 3].map((item) => (
                    <Skeleton
                        key={item}
                        className="h-40"
                    />
                ))}

            </div>

            <Skeleton className="h-96" />

        </div>
    );
}