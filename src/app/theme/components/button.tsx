"use client";

interface ThemeButtonProps {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const ThemeButton = ({
  variant = "default",
  size = "md",
  disabled = false,
  onClick,
  children,
  className = "",
}: ThemeButtonProps) => {
  const variantClass = `theme-button-${variant}`;
  const sizeClass = `theme-button-${size}`;

  return (
    <button
      type="button"
      className={`theme-button ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
