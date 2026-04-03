import type React from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive"
    | "link";
  size?: "sm" | "md" | "lg" | "icon" | "icon-sm" | "icon-lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "default",
      size = "md",
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseStyles = [
      "inline-flex items-center justify-center gap-2",
      "font-medium rounded-md",
      "transition-colors duration-200",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
      "disabled:opacity-50 disabled:cursor-not-allowed",
    ];

    const variantStyles = {
      default: ["bg-primary text-primary-foreground hover:bg-primary/80"],
      secondary: [
        "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ],
      outline: ["border border-input bg-background hover:bg-muted"],
      ghost: ["hover:bg-muted"],
      destructive: [
        "bg-destructive text-destructive-foreground hover:bg-destructive/80",
      ],
      link: ["text-primary underline underline-offset-4 hover:text-primary/80"],
    };

    const sizeStyles = {
      sm: ["h-8 px-3 text-sm"],
      md: ["h-10 px-4 text-base"],
      lg: ["h-12 px-6 text-lg"],
      icon: ["h-10 w-10"],
      "icon-sm": ["h-8 w-8"],
      "icon-lg": ["h-12 w-12"],
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
