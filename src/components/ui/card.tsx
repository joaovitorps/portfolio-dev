import type React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

interface CardHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = ({ className, children, ...props }: CardProps) => (
  <div
    className={cn(
      "bg-card",
      "border",
      "border-border",
      "rounded-lg",
      "p-6",
      "transition-all",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({
  title,
  subtitle,
  icon,
  className,
  children,
  ...props
}: CardHeaderProps) => (
  <div className={cn("mb-4", className)} {...props}>
    {title && (
      <div className="flex items-center gap-2 mb-1">
        {icon && <div className="text-3xl">{icon}</div>}
        <h2 className="text-xl font-semibold text-card-foreground">{title}</h2>
      </div>
    )}
    {subtitle && (
      <p className="text-sm text-muted-foreground uppercase tracking-wider">
        {subtitle}
      </p>
    )}
    {children}
  </div>
);

export const CardContent = ({
  className,
  children,
  ...props
}: CardContentProps) => (
  <div className={cn("text-foreground", className)} {...props}>
    {children}
  </div>
);
