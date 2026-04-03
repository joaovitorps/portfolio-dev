import type React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

interface CardHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = ({ className, children, ...props }: CardProps) => (
  <div
    className={cn(
      "bg-card border border-border rounded-lg p-6 transition-all",
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
  className,
  children,
  ...props
}: CardHeaderProps) => (
  <div className={cn("mb-4", className)} {...props}>
    {title && (
      <h2 className="text-xl font-semibold text-card-foreground mb-1">
        {title}
      </h2>
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
