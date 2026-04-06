"use client";

import { useState } from "react";
import "./theme.css";
import { ComponentPreview } from "./components/component-preview";
import { ContrastGrid } from "./components/contrast-grid";
import { PaletteGrid } from "./components/palette-grid";
import { ThemeSwitcher } from "./components/theme-switcher";
import { TypographyPreview } from "./components/typography-preview";

type ThemeOption =
  | "option1"
  | "option2"
  | "option3"
  | "option4"
  | "option5"
  | "option6"
  | "option7";

interface ContrastPair {
  bgHex: string;
  textHex: string;
  bgLabel: string;
  textLabel: string;
}

// Define contrast pairs for each theme option
const getContrastPairs = (themeOption: ThemeOption): ContrastPair[] => {
  const pairs: Record<ThemeOption, ContrastPair[]> = {
    option1: [
      // Option 1: Teal Inverted (Dark mode)
      {
        bgHex: "#091413",
        textHex: "#408A71",
        bgLabel: "Dark BG",
        textLabel: "Primary",
      },
      {
        bgHex: "#091413",
        textHex: "#B0E4CC",
        bgLabel: "Dark BG",
        textLabel: "Accent",
      },
      {
        bgHex: "#285A48",
        textHex: "#B0E4CC",
        bgLabel: "Dark Card",
        textLabel: "Accent",
      },
      // Option 1: Teal Inverted (Light mode)
      {
        bgHex: "#F8FFFE",
        textHex: "#0D5C47",
        bgLabel: "Light BG",
        textLabel: "Primary",
      },
      {
        bgHex: "#F8FFFE",
        textHex: "#285A48",
        bgLabel: "Light BG",
        textLabel: "Secondary",
      },
      {
        bgHex: "#E0F2ED",
        textHex: "#0D5C47",
        bgLabel: "Light Card",
        textLabel: "Primary (Teal)",
      },
    ],
    option4: [
      // Option 4: Teal + Mauve (Dark mode)
      {
        bgHex: "#091413",
        textHex: "#408A71",
        bgLabel: "Dark BG",
        textLabel: "Primary (Teal)",
      },
      {
        bgHex: "#091413",
        textHex: "#6A5D7B",
        bgLabel: "Dark BG",
        textLabel: "Accent (Mauve)",
      },
      {
        bgHex: "#285A48",
        textHex: "#6A5D7B",
        bgLabel: "Dark Card",
        textLabel: "Accent (Mauve)",
      },
      // Option 4: Teal + Mauve (Light mode)
      {
        bgHex: "#F8FFFE",
        textHex: "#0D5C47",
        bgLabel: "Light BG",
        textLabel: "Primary (Teal)",
      },
      {
        bgHex: "#F8FFFE",
        textHex: "#6A5D7B",
        bgLabel: "Light BG",
        textLabel: "Accent (Mauve)",
      },
      {
        bgHex: "#E0F2ED",
        textHex: "#0D5C47",
        bgLabel: "Light Card",
        textLabel: "Primary (Teal)",
      },
    ],
    option5: [
      // Option 5: Teal + Terracotta (Dark mode)
      {
        bgHex: "#091413",
        textHex: "#408A71",
        bgLabel: "Dark BG",
        textLabel: "Primary (Teal)",
      },
      {
        bgHex: "#091413",
        textHex: "#E8A87C",
        bgLabel: "Dark BG",
        textLabel: "Accent (Terracotta)",
      },
      {
        bgHex: "#285A48",
        textHex: "#E8A87C",
        bgLabel: "Dark Card",
        textLabel: "Accent (Terracotta)",
      },
      // Option 5: Teal + Terracotta (Light mode)
      {
        bgHex: "#F8FFFE",
        textHex: "#0D5C47",
        bgLabel: "Light BG",
        textLabel: "Primary (Teal)",
      },
      {
        bgHex: "#F8FFFE",
        textHex: "#E8A87C",
        bgLabel: "Light BG",
        textLabel: "Accent (Terracotta)",
      },
      {
        bgHex: "#E0F2ED",
        textHex: "#0D5C47",
        bgLabel: "Light Card",
        textLabel: "Primary (Teal)",
      },
    ],
    option6: [
      // Option 6: Teal + Vibrant Orange (Dark mode)
      {
        bgHex: "#091413",
        textHex: "#408A71",
        bgLabel: "Dark BG",
        textLabel: "Primary (Teal)",
      },
      {
        bgHex: "#091413",
        textHex: "#FF6B35",
        bgLabel: "Dark BG",
        textLabel: "Accent (Orange) - AAA",
      },
      {
        bgHex: "#285A48",
        textHex: "#FF6B35",
        bgLabel: "Dark Card",
        textLabel: "Accent (Orange) - AAA",
      },
      // Option 6: Teal + Vibrant Orange (Light mode)
      {
        bgHex: "#F8FFFE",
        textHex: "#0D5C47",
        bgLabel: "Light BG",
        textLabel: "Primary (Teal)",
      },
      {
        bgHex: "#F8FFFE",
        textHex: "#FF6B35",
        bgLabel: "Light BG",
        textLabel: "Accent (Orange) - AAA",
      },
      {
        bgHex: "#E0F2ED",
        textHex: "#0D5C47",
        bgLabel: "Light Card",
        textLabel: "Primary (Teal)",
      },
    ],
    option7: [
      // Option 7: Teal + Burgundy (Dark mode)
      {
        bgHex: "#091413",
        textHex: "#408A71",
        bgLabel: "Dark BG",
        textLabel: "Primary (Teal)",
      },
      {
        bgHex: "#091413",
        textHex: "#800020",
        bgLabel: "Dark BG",
        textLabel: "Accent (Burgundy)",
      },
      {
        bgHex: "#285A48",
        textHex: "#800020",
        bgLabel: "Dark Card",
        textLabel: "Accent (Burgundy)",
      },
      // Option 7: Teal + Burgundy (Light mode)
      {
        bgHex: "#F8FFFE",
        textHex: "#0D5C47",
        bgLabel: "Light BG",
        textLabel: "Primary (Teal)",
      },
      {
        bgHex: "#F8FFFE",
        textHex: "#800020",
        bgLabel: "Light BG",
        textLabel: "Accent (Burgundy)",
      },
      {
        bgHex: "#E0F2ED",
        textHex: "#0D5C47",
        bgLabel: "Light Card",
        textLabel: "Primary (Teal)",
      },
    ],
    option2: [
      // Option 2: Teal + Golden (Dark mode)
      {
        bgHex: "#091413",
        textHex: "#408A71",
        bgLabel: "Dark BG",
        textLabel: "Primary (Teal)",
      },
      {
        bgHex: "#091413",
        textHex: "#CBA135",
        bgLabel: "Dark BG",
        textLabel: "Accent (Golden)",
      },
      {
        bgHex: "#285A48",
        textHex: "#CBA135",
        bgLabel: "Dark Card",
        textLabel: "Accent (Golden)",
      },
      // Option 2: Teal + Golden (Light mode)
      {
        bgHex: "#F8FFFE",
        textHex: "#0D5C47",
        bgLabel: "Light BG",
        textLabel: "Primary (Teal)",
      },
      {
        bgHex: "#F8FFFE",
        textHex: "#CBA135",
        bgLabel: "Light BG",
        textLabel: "Accent (Golden)",
      },
      {
        bgHex: "#E0F2ED",
        textHex: "#0D5C47",
        bgLabel: "Light Card",
        textLabel: "Primary (Teal)",
      },
    ],
    option3: [
      // Option 3: Teal + Cream (Dark mode)
      {
        bgHex: "#091413",
        textHex: "#408A71",
        bgLabel: "Dark BG",
        textLabel: "Primary (Teal)",
      },
      {
        bgHex: "#091413",
        textHex: "#F3EFE0",
        bgLabel: "Dark BG",
        textLabel: "Accent (Cream)",
      },
      {
        bgHex: "#285A48",
        textHex: "#F3EFE0",
        bgLabel: "Dark Card",
        textLabel: "Accent (Cream)",
      },
      // Option 3: Teal + Cream (Light mode)
      {
        bgHex: "#F8FFFE",
        textHex: "#0D5C47",
        bgLabel: "Light BG",
        textLabel: "Primary (Teal)",
      },
      {
        bgHex: "#F8FFFE",
        textHex: "#F3EFE0",
        bgLabel: "Light BG",
        textLabel: "Accent (Cream)",
      },
      {
        bgHex: "#E0F2ED",
        textHex: "#0D5C47",
        bgLabel: "Light Card",
        textLabel: "Primary (Teal)",
      },
    ],
  };

  return pairs[themeOption];
};

// Define palette colors for each theme
const getPaletteColors = (themeOption: ThemeOption) => {
  interface PaletteSection {
    label: string;
    colors: Array<{
      name: string;
      hex: string;
      category: "Background" | "Primary" | "Accent" | "Support";
    }>;
  }

  const palettes: Record<ThemeOption, PaletteSection[]> = {
    option1: [
      {
        label: "Dark Mode",
        colors: [
          { name: "Background", hex: "#091413", category: "Background" },
          { name: "Card", hex: "#285A48", category: "Support" },
          { name: "Primary", hex: "#408A71", category: "Primary" },
          { name: "Accent", hex: "#B0E4CC", category: "Accent" },
        ],
      },
      {
        label: "Light Mode",
        colors: [
          { name: "Background", hex: "#F8FFFE", category: "Background" },
          { name: "Card", hex: "#E0F2ED", category: "Support" },
          { name: "Primary", hex: "#0D5C47", category: "Primary" },
          { name: "Accent", hex: "#285A48", category: "Accent" },
        ],
      },
    ],
    option2: [
      {
        label: "Dark Mode",
        colors: [
          { name: "Background", hex: "#091413", category: "Background" },
          { name: "Card", hex: "#285A48", category: "Support" },
          { name: "Primary (Teal)", hex: "#408A71", category: "Primary" },
          { name: "Accent (Golden)", hex: "#CBA135", category: "Accent" },
        ],
      },
      {
        label: "Light Mode",
        colors: [
          { name: "Background", hex: "#F8FFFE", category: "Background" },
          { name: "Card", hex: "#E0F2ED", category: "Support" },
          { name: "Primary (Teal)", hex: "#0D5C47", category: "Primary" },
          { name: "Accent (Golden)", hex: "#CBA135", category: "Accent" },
        ],
      },
    ],
    option3: [
      {
        label: "Dark Mode",
        colors: [
          { name: "Background", hex: "#091413", category: "Background" },
          { name: "Card", hex: "#285A48", category: "Support" },
          { name: "Primary (Teal)", hex: "#408A71", category: "Primary" },
          { name: "Accent (Cream)", hex: "#F3EFE0", category: "Accent" },
        ],
      },
      {
        label: "Light Mode",
        colors: [
          { name: "Background", hex: "#F8FFFE", category: "Background" },
          { name: "Card", hex: "#E0F2ED", category: "Support" },
          { name: "Primary (Teal)", hex: "#0D5C47", category: "Primary" },
          { name: "Accent (Cream)", hex: "#F3EFE0", category: "Accent" },
        ],
      },
    ],
    option4: [
      {
        label: "Dark Mode",
        colors: [
          { name: "Background", hex: "#091413", category: "Background" },
          { name: "Card", hex: "#285A48", category: "Support" },
          { name: "Primary (Teal)", hex: "#408A71", category: "Primary" },
          { name: "Accent (Mauve)", hex: "#6A5D7B", category: "Accent" },
        ],
      },
      {
        label: "Light Mode",
        colors: [
          { name: "Background", hex: "#F8FFFE", category: "Background" },
          { name: "Card", hex: "#E0F2ED", category: "Support" },
          { name: "Primary (Teal)", hex: "#0D5C47", category: "Primary" },
          { name: "Accent (Mauve)", hex: "#6A5D7B", category: "Accent" },
        ],
      },
    ],
    option5: [
      {
        label: "Dark Mode",
        colors: [
          { name: "Background", hex: "#091413", category: "Background" },
          { name: "Card", hex: "#285A48", category: "Support" },
          { name: "Primary (Teal)", hex: "#408A71", category: "Primary" },
          { name: "Accent (Terracotta)", hex: "#E8A87C", category: "Accent" },
        ],
      },
      {
        label: "Light Mode",
        colors: [
          { name: "Background", hex: "#F8FFFE", category: "Background" },
          { name: "Card", hex: "#E0F2ED", category: "Support" },
          { name: "Primary (Teal)", hex: "#0D5C47", category: "Primary" },
          { name: "Accent (Terracotta)", hex: "#E8A87C", category: "Accent" },
        ],
      },
    ],
    option6: [
      {
        label: "Dark Mode",
        colors: [
          { name: "Background", hex: "#091413", category: "Background" },
          { name: "Card", hex: "#285A48", category: "Support" },
          { name: "Primary (Teal)", hex: "#408A71", category: "Primary" },
          { name: "Accent (Orange)", hex: "#FF6B35", category: "Accent" },
        ],
      },
      {
        label: "Light Mode",
        colors: [
          { name: "Background", hex: "#F8FFFE", category: "Background" },
          { name: "Card", hex: "#E0F2ED", category: "Support" },
          { name: "Primary (Teal)", hex: "#0D5C47", category: "Primary" },
          { name: "Accent (Orange)", hex: "#FF6B35", category: "Accent" },
        ],
      },
    ],
    option7: [
      {
        label: "Dark Mode",
        colors: [
          { name: "Background", hex: "#091413", category: "Background" },
          { name: "Card", hex: "#285A48", category: "Support" },
          { name: "Primary (Teal)", hex: "#408A71", category: "Primary" },
          { name: "Accent (Burgundy)", hex: "#800020", category: "Accent" },
        ],
      },
      {
        label: "Light Mode",
        colors: [
          { name: "Background", hex: "#F8FFFE", category: "Background" },
          { name: "Card", hex: "#E0F2ED", category: "Support" },
          { name: "Primary (Teal)", hex: "#0D5C47", category: "Primary" },
          { name: "Accent (Burgundy)", hex: "#800020", category: "Accent" },
        ],
      },
    ],
  };

  return palettes[themeOption];
};

export default function ThemePage() {
  const [currentTheme, setCurrentTheme] = useState<ThemeOption>("option1");

  return (
    <div data-theme={currentTheme} className="theme-container">
      {/* HEADER */}
      <div className="theme-section">
        <h1 className="theme-section-title">Theme Testing & Comparison</h1>
        <p className="theme-section-description">
          Compare three color palette options with WCAG contrast analysis,
          component previews, and typography styles. Select an option using the
          switcher below to view all theme variations.
        </p>
      </div>

      {/* THEME SWITCHER */}
      <div
        style={{
          padding: "2rem",
          background: "var(--bg-dark)",
          borderBottom: "1px solid var(--border-dark)",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.875rem",
              marginBottom: "1rem",
              color: "var(--muted-foreground-dark)",
            }}
          >
            Select a theme option:
          </p>
          <ThemeSwitcher
            currentTheme={currentTheme}
            onThemeChange={setCurrentTheme}
          />
        </div>
      </div>

      {/* PALETTE GRID SECTION */}
      <div className="theme-section">
        <h2 className="theme-section-title">Color Palettes</h2>
        <p className="theme-section-description">
          Each theme option includes distinct color palettes for dark and light
          modes.
        </p>

        <div className="theme-space-y">
          {getPaletteColors(currentTheme).map((palette) => (
            <div key={`palette-${palette.label}`}>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  marginBottom: "1rem",
                  color: "var(--primary-dark)",
                }}
              >
                {palette.label}
              </h3>
              <PaletteGrid colors={palette.colors} />
            </div>
          ))}
        </div>
      </div>

      {/* CONTRAST ANALYSIS SECTION */}
      <div className="theme-section">
        <h2 className="theme-section-title">WCAG Contrast Analysis</h2>
        <p className="theme-section-description">
          Accessibility analysis for text-on-background contrast ratios. Badges
          indicate WCAG compliance levels (AAA = best, AA = acceptable, Fail =
          insufficient).
        </p>

        <div style={{ marginTop: "1.5rem", overflowX: "auto" }}>
          <ContrastGrid pairs={getContrastPairs(currentTheme)} />
        </div>
      </div>

      {/* TYPOGRAPHY SECTION */}
      <div className="theme-section">
        <h2 className="theme-section-title">Typography</h2>
        <p className="theme-section-description">
          Font hierarchy and text styles used across the theme.
        </p>
        <div style={{ marginTop: "1.5rem" }}>
          <TypographyPreview />
        </div>
      </div>

      {/* COMPONENT PREVIEW SECTION */}
      <div className="theme-section">
        <h2 className="theme-section-title">Component States</h2>
        <p className="theme-section-description">
          Interactive components in all states (default, hover, active,
          disabled, etc.)
        </p>
        <div style={{ marginTop: "1.5rem" }}>
          <ComponentPreview />
        </div>
      </div>

      {/* FOOTER */}
      <div className="theme-section" style={{ borderBottom: "none" }}>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--muted-foreground-dark)",
            margin: 0,
          }}
        >
          Theme testing page. Use the switcher at the top to compare different
          color palettes. All components, colors, and styles are self-contained
          within the <code>/src/app/theme/</code> directory.
        </p>
      </div>
    </div>
  );
}
