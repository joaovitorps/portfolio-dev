"use client";

interface ThemeCardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const ThemeCard = ({
  title,
  subtitle,
  children,
  className = "",
}: ThemeCardProps) => {
  return (
    <div className={`theme-card ${className}`}>
      {(title || subtitle) && (
        <div className="theme-card-header">
          {title && <h3 className="theme-card-title">{title}</h3>}
          {subtitle && <p className="theme-card-subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="theme-card-content">{children}</div>
    </div>
  );
};
