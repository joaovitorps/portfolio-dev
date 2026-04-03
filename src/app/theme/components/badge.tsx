"use client";

interface ThemeBadgeProps {
  variant?: "default" | "secondary" | "outline" | "muted" | "destructive";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const ThemeBadge = ({
  variant = "default",
  size = "md",
  children,
  icon,
  className = "",
}: ThemeBadgeProps) => {
  const variantClass = `theme-badge-${variant}`;
  const sizeClass = `theme-badge-${size}`;

  return (
    <span className={`theme-badge ${variantClass} ${sizeClass} ${className}`}>
      {icon}
      {children}
    </span>
  );
};
