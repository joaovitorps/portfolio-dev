"use client";

import { cn } from "@/lib/utils";

interface CartoonButtonProps {
  label: string;
  color?: string;
  hasHighlight?: boolean;
  href?: string;
}

const buttonStyles = [
  "group",
  "relative",
  "isolate",
  "inline-flex",
  "h-12",
  "items-center",
  "justify-center",
  "overflow-hidden",
  "rounded-full",
  "border-2",
  "border-neutral-800",
  "px-4",
  "font-bold",
  "text-neutral-800",
  "transition-all",
  "duration-150",
  "hover:-translate-y-1",
  "hover:shadow-[0_4px_0_0_#262626]",
  "active:translate-y-0",
  "active:shadow-none",
];

const highlightStyles = [
  "pointer-events-none",
  "absolute",
  "top-1/2",
  "right-[-100%]",
  "z-0",
  "h-24",
  "w-16",
  "-translate-y-1/2",
  "rotate-12",
  "bg-white/50",
  "opacity-0",
  "transition-all",
  "duration-500",
  "ease-in-out",
  "group-hover:right-[200%]",
  "group-hover:opacity-100",
];

export const CartoonButton = ({
  label,
  color = "bg-orange-400",
  hasHighlight = true,
  href,
}: CartoonButtonProps) => {
  const content = (
    <>
      <span className="relative z-10 whitespace-nowrap">{label}</span>
      {hasHighlight && <span className={cn(highlightStyles)} />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={cn(buttonStyles, color)}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={cn(buttonStyles, color)}>
      {content}
    </button>
  );
};
