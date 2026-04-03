import type React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "muted" | "destructive";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

export const Badge = ({
  variant = "default",
  size = "md",
  icon,
  children,
  className,
  ...props
}: BadgeProps) => {
  const baseStyles = [
    "inline-flex items-center gap-1.5",
    "font-medium rounded",
    "transition-colors duration-200",
  ];

  const variantStyles = {
    default: ["bg-primary text-primary-foreground"],
    secondary: ["bg-secondary text-secondary-foreground"],
    muted: ["bg-muted text-foreground"],
    destructive: ["bg-destructive text-destructive-foreground"],
  };

  const sizeStyles = {
    sm: ["px-2 py-0.5", "text-xs"],
    md: ["px-2.5 py-1", "text-sm"],
    lg: ["px-3 py-1.5", "text-base"],
  };

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      {children}
    </div>
  );
};
