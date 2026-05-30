import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "pro" | "admin" | "success" | "warning" | "danger";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium",
        variant === "default" && "bg-white/8 text-text-secondary",
        variant === "pro"     && "bg-accent/15 text-accent border border-accent/20",
        variant === "admin"   && "bg-red-500/15 text-red-400 border border-red-500/20",
        variant === "success" && "bg-green-500/15 text-green-400 border border-green-500/20",
        variant === "warning" && "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20",
        variant === "danger"  && "bg-red-500/15 text-red-400 border border-red-500/20",
        className
      )}
    >
      {children}
    </span>
  );
}
