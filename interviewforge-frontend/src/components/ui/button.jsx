import { cn } from "@/lib/utils";

export default function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}) {
  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary:
      "border border-slate-300 bg-white hover:bg-slate-100",
    danger:
      "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      className={`rounded-xl px-6 py-3 font-semibold transition ${variants[variant]
        } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}