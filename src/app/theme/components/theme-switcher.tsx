"use client";

type ThemeOption =
  | "option1"
  | "option2"
  | "option3"
  | "option4"
  | "option5"
  | "option6"
  | "option7";

interface ThemeSwitcherProps {
  currentTheme: ThemeOption;
  onThemeChange: (theme: ThemeOption) => void;
}

const themeLabels: Record<ThemeOption, string> = {
  option1: "Option 1: Teal Inverted",
  option2: "Option 2: Teal + Golden",
  option3: "Option 3: Teal + Cream",
  option4: "Option 4: Teal + Mauve",
  option5: "Option 5: Teal + Terracotta",
  option6: "Option 6: Teal + Orange (WCAG)",
  option7: "Option 7: Teal + Burgundy",
};

export const ThemeSwitcher = ({
  currentTheme,
  onThemeChange,
}: ThemeSwitcherProps) => {
  return (
    <div className="theme-switcher">
      {(
        [
          "option1",
          "option2",
          "option3",
          "option4",
          "option5",
          "option6",
          "option7",
        ] as const
      ).map((option) => (
        <button
          type="button"
          key={option}
          className={`theme-switcher-button ${
            currentTheme === option ? "active" : ""
          }`}
          onClick={() => onThemeChange(option)}
        >
          {themeLabels[option]}
        </button>
      ))}
    </div>
  );
};
